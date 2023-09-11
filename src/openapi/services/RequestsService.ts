/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestCreate } from '../models/RequestCreate';
import type { RequestInDB } from '../models/RequestInDB';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RequestsService {

    /**
     * Get Request
     * @param id 
     * @returns RequestInDB Successful Response
     * @throws ApiError
     */
    public static getRequestApiV1RequestsGet(
id: string,
): CancelablePromise<RequestInDB> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/requests/',
            query: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Request
     * @param requestBody 
     * @returns RequestInDB Successful Response
     * @throws ApiError
     */
    public static createRequestApiV1RequestsPost(
requestBody: RequestCreate,
): CancelablePromise<RequestInDB> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/requests/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
