/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TeamsExpand } from '../models/TeamsExpand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TeamsService {

    /**
     * Get Users
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getUsersApiV1TeamsGet(
teamId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/teams/',
            query: {
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Team
     * @param teamName 
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createTeamApiV1TeamsPost(
teamName: string,
requestBody: Array<string>,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/teams/',
            query: {
                'team_name': teamName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Member
     * @param userId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteMemberApiV1TeamsDelete(
userId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/teams/',
            query: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Member
     * @param userId 
     * @param teamId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addMemberApiV1TeamsAddPost(
userId: string,
teamId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/teams/add',
            query: {
                'user_id': userId,
                'team_id': teamId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Multi
     * @param skip 
     * @param limit 
     * @returns TeamsExpand Successful Response
     * @throws ApiError
     */
    public static getMultiApiV1TeamsAllGet(
skip: number,
limit: number,
): CancelablePromise<Array<TeamsExpand>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/teams/all',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
