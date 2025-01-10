import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    query: string,
    email: string,
    phoneNumber: string,
  ): Promise<User[]> {
    const qb = this.userRepository.createQueryBuilder('user');
    if (query) {
      qb.andWhere('user.firstName LIKE :query', { query: `%${query}%` });
    }

    if (email) {
      qb.andWhere('user.email = :email', { email });
    }

    if (phoneNumber) {
      qb.andWhere('user.phoneNumber = :phoneNumber', { phoneNumber });
    }

    return qb.getMany();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({
      _id: id,
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({
      _id: id,
    });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
