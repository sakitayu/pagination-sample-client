import { getNoAuthClient } from '@/Infrastructure/RestClient';
import { User } from '@/Domain/Entity/User';
import { UserFactory, UserResponseObject } from '@/Domain/Factory/UserFactory';

export class UserRepository {
    static async index(
        pageNumber: number,
    ): Promise<{ data: User[]; totalPages: number }> {
        const res = await getNoAuthClient().get<UserResponseObject[]>(
            `/users?page=${pageNumber}`,
        );
        return {
            data: res.data.map(UserFactory.createFromResponse),
            totalPages: Number(res.headers['total-pages']),
        };
    }
}
