import { User } from '@/Domain/Entity/User';

export type UserResponseObject = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export class UserFactory {
    static createFromResponse(res: UserResponseObject): User {
        return new User(
            res.id,
            res.name,
            new Date(res.created_at),
            new Date(res.updated_at),
        );
    }
}
