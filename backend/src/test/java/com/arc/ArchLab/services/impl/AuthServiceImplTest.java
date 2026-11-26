package com.arc.ArchLab.services.impl;

import com.arc.ArchLab.dao.request.LoginRequest;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.dao.response.LoginResponse;
import com.arc.ArchLab.dao.response.UserResponse;
import com.arc.ArchLab.exceptions.ArchException;
import com.arc.ArchLab.exceptions.ErrorCode;
import com.arc.ArchLab.model.User;
import com.arc.ArchLab.repository.UserRepository;
import com.arc.ArchLab.utils.AuthUtils;
import com.arc.ArchLab.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    private static final String USER_ID = "user-1";
    private static final String USERNAME = "santhosh";
    private static final String PASSWORD = "secret123";

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void loginReturnsUserWithValidTokenWhenCredentialsAreCorrect() throws IOException {
        when(userRepository.getByUserName(USERNAME))
                .thenReturn(Optional.of(existingUser()));

        LoginResponse response = authService.login(new LoginRequest(USERNAME, PASSWORD));

        assertEquals(USERNAME, response.getName());
        assertNotNull(response.getJwtToken());
        Claims claims = JwtUtils.verify(response.getJwtToken());
        assertEquals(USERNAME, claims.getSubject());
        assertEquals(USER_ID, claims.get("userId", String.class));
        verify(userRepository).getByUserName(USERNAME);
    }

    @Test
    void loginThrowsUserNotFoundWhenAccountDoesNotExist() throws IOException {
        when(userRepository.getByUserName(USERNAME)).thenReturn(Optional.empty());

        assertErrorCode(() -> authService.login(new LoginRequest(USERNAME, PASSWORD)),
                ErrorCode.USER_NOT_FOUND);
    }

    @Test
    void loginThrowsInvalidCredentialsWhenPasswordDoesNotMatch() throws IOException {
        when(userRepository.getByUserName(USERNAME))
                .thenReturn(Optional.of(existingUser()));

        assertErrorCode(() -> authService.login(new LoginRequest(USERNAME, "wrong-password")),
                ErrorCode.INVALID_CREDENTIALS);
    }

    @Test
    void loginMapsRepositoryFailureToInternalServerError() throws IOException {
        when(userRepository.getByUserName(USERNAME)).thenThrow(new IOException("search failed"));

        assertErrorCode(() -> authService.login(new LoginRequest(USERNAME, PASSWORD)),
                ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @Test
    void signUpHashesPasswordBeforeSavingAndReturnsCreatedUser() throws IOException {
        when(userRepository.getByUserName(USERNAME)).thenReturn(Optional.empty());
        when(userRepository.save(any(UserRequest.class))).thenReturn(USER_ID);

        UserResponse response = authService.signUp(new UserRequest(USERNAME, PASSWORD));

        ArgumentCaptor<UserRequest> savedRequest = ArgumentCaptor.forClass(UserRequest.class);
        verify(userRepository).save(savedRequest.capture());
        String hashedPassword = savedRequest.getValue().getPassword();
        assertNotEquals(PASSWORD, hashedPassword);
        assertTrue(AuthUtils.verifyPassword(PASSWORD, hashedPassword));
        assertEquals(USER_ID, response.getId());
        assertEquals(USERNAME, response.getUsername());
        assertEquals(hashedPassword, response.getPassword());
    }

    @Test
    void signUpThrowsUserAlreadyExistsWithoutSaving() throws IOException {
        when(userRepository.getByUserName(USERNAME))
                .thenReturn(Optional.of(existingUser()));

        assertErrorCode(() -> authService.signUp(new UserRequest(USERNAME, PASSWORD)),
                ErrorCode.USER_ALREADY_EXISTS);
        verify(userRepository, never()).save(any(UserRequest.class));
    }

    @Test
    void signUpMapsRepositoryFailureToInternalServerError() throws IOException {
        when(userRepository.getByUserName(USERNAME)).thenReturn(Optional.empty());
        when(userRepository.save(any(UserRequest.class))).thenThrow(new IOException("index failed"));

        assertErrorCode(() -> authService.signUp(new UserRequest(USERNAME, PASSWORD)),
                ErrorCode.INTERNAL_SERVER_ERROR);
    }

    private static User existingUser() {
        return new User(USER_ID, USERNAME, AuthUtils.hashPassword(PASSWORD));
    }

    private static void assertErrorCode(Executable action, ErrorCode expected) {
        ArchException exception = assertThrows(ArchException.class, action);
        assertEquals(expected, exception.getErrorCode());
        assertEquals(expected.getStatus(), exception.getErrorCode().getStatus());
        assertEquals(expected.getMessage(), exception.getMessage());
    }
}
