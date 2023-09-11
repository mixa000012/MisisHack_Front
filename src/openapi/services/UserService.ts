/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_for_token_api_v1_user_token_post } from '../models/Body_login_for_token_api_v1_user_token_post';
import type { TokenData } from '../models/TokenData';
import type { User_ } from '../models/User_';
import type { UserBase } from '../models/UserBase';
import type { UserFull } from '../models/UserFull';
import type { UserShow } from '../models/UserShow';
import type { UserUpdateData } from '../models/UserUpdateData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Login For Token
     * @param formData 
     * @returns TokenData Successful Response
     * @throws ApiError
     */
    public static loginForTokenApiV1UserTokenPost(
formData: Body_login_for_token_api_v1_user_token_post,
): CancelablePromise<TokenData> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User
     * @param requestBody 
     * @returns User_ Successful Response
     * @throws ApiError
     */
    public static updateUserApiV1UserUsersPut(
requestBody: UserUpdateData,
): CancelablePromise<User_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create User
     * @param requestBody 
     * @returns UserShow Successful Response
     * @throws ApiError
     */
    public static createUserApiV1UserUsersPost(
requestBody: UserBase,
): CancelablePromise<UserShow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User
     * @returns UserFull Successful Response
     * @throws ApiError
     */
    public static getUserApiV1UserGet(): CancelablePromise<UserFull> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/',
        });
    }

    /**
     * Delete User
     * @param userId 
     * @returns UserShow Successful Response
     * @throws ApiError
     */
    public static deleteUserApiV1UserDelete(
userId: string,
): CancelablePromise<UserShow> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/user/',
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Revoke Admin Privilege
     * @param email 
     * @returns UserShow Successful Response
     * @throws ApiError
     */
    public static revokeAdminPrivilegeApiV1UserAdminPrivilegeDelete(
email: string,
): CancelablePromise<UserShow> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/user/admin_privilege',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Grant Admin Privilege
     * @param email 
     * @returns UserShow Successful Response
     * @throws ApiError
     */
    public static grantAdminPrivilegeApiV1UserAdminPrivilegePatch(
email: string,
): CancelablePromise<UserShow> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/user/admin_privilege',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
