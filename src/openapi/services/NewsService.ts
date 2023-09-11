/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventTags } from '../models/EventTags';
import type { NewsCreate } from '../models/NewsCreate';
import type { ShowNews } from '../models/ShowNews';
import type { TagShow } from '../models/TagShow';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsService {

    /**
     * Get News
     * @param skip 
     * @param limit 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNewsApiV1NewsNewsGet(
skip: number,
limit: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/news/news',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create New
     * @param requestBody 
     * @returns ShowNews Successful Response
     * @throws ApiError
     */
    public static createNewApiV1NewsNewsPost(
requestBody: NewsCreate,
): CancelablePromise<ShowNews> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/news/news',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Filter News
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static filterNewsApiV1NewsFilterPost(
requestBody: Array<EventTags>,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/news/filter',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param name 
     * @returns TagShow Successful Response
     * @throws ApiError
     */
    public static createApiV1NewsTagPost(
name: string,
): CancelablePromise<TagShow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/news/tag',
            query: {
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Tags
     * @param skip 
     * @param limit 
     * @returns TagShow Successful Response
     * @throws ApiError
     */
    public static getTagsApiV1NewsAllGet(
skip: number,
limit: number,
): CancelablePromise<Array<TagShow>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/news/all',
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
