import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../../service/user.service';
import { emailPhones, namesEmails } from '../seed-data';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const usersToInsert = this.createUsers(emailPhones, namesEmails);

    const existingUsers = await this.userService.findAll('', '', '');
    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping seed.');
      return;
    }

    for (const user of usersToInsert) {
      await this.userService.create(user);
    }

    console.log(`${usersToInsert.length} users seeded successfully.`);
  }

  // Combines the emailPhones and namesEmails arrays to create user objects
  private createUsers(
    emailPhones: {
      email: string;
      phoneNumbers: { type: string; value: string }[];
    }[],
    namesEmails: { firstName: string; lastName: string; email: string }[],
  ) {
    const users = [];

    namesEmails.forEach(({ firstName, lastName, email }) => {
      const emailData = emailPhones.find((item) => item.email === email);

      if (emailData) {
        const user = {
          firstName,
          lastName,
          email,
          phoneNumber: emailData.phoneNumbers[0].value,
        };

        users.push(user);
      }
    });

    return users;
  }
}
