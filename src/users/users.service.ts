import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  /**
   * Get all users and filter them by role
   * @param role UserRole
   */
  async findAll(role?: UserRole) {
    if(role) {
      const rolesArray = await this.usersRepository.find(
        {
          where: { role },
          select: {
            id: true,
            username: true,
            password_hash: false,
            role: true,
            name: true,
            surname: true,
            telephone: true,
            address: true,
            email: true
          }
        }
      );
      if(rolesArray.length === 0) throw new NotFoundException('User Role Not Found');
      return rolesArray
    }
    return await this.usersRepository.find({
      select: {
        id: true,
        username: true,
        password_hash: false,
        role: true,
        name: true,
        surname: true,
        telephone: true,
        address: true,
        email: true
      }
    })
  }

  /**
   * Find just one user by id
   * @param id number
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(
      {
        where: { id },
        select: {
          id: true,
          username: true,
          password_hash: false,
          role: true,
          name: true,
          surname: true,
          telephone: true,
          address: true,
          email: true
        }
      }
    )
    if(!user) {
      throw new NotFoundException('User not found!!!');
    }
    return user
  }

  /**
   * Find just one user by username
   * @param username string
   */
  async findOneByUsername(username: string): Promise<User> {
    let findUser = await this.usersRepository.findOne({ where: { username } });
    return findUser
  }

  /**
   * Check if user exists by username
   * @param username
   */
  async checkIfUserExist(username: string) {
    let foundUser = await this.usersRepository.findOne({ where: { username } });
    if (foundUser) {
      throw new NotFoundException('User already exists!!!');
    }
    return false
  }

  /**
   * Create a new User
   * @param createUserDto CreateUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto
    const foundUser = await this.checkIfUserExist(username);
    if(!foundUser) {
      const user = this.usersRepository.create(createUserDto);
      try {
        return await this.usersRepository.save(user);
      } catch (error) {
        throw new HttpException('Error User Creation ' + error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  /**
   * Update existing User
   * @param id number
   * @param updatedUserDto UpdateUserDto
   */
  async update(id: number, updatedUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(
        {
          where: { id },
          select: {
            id: true,
            username: true,
            password_hash: false,
            role: true,
            name: true,
            surname: true,
            telephone: true,
            address: true,
            email: true
          }
        }
      );
    // Check that record exist
    if(!user) {
      throw new NotFoundException('User not found!!!');
    }
    const modifiedUser = {...user, ...updatedUserDto};
    return await this.usersRepository.save(modifiedUser)
  }

  /**
   * Delete an existing User selected by id
   * @param id number
   */
  async delete(id: number) {

    let user = await this.usersRepository.findOne({ where: { id } });
    if(!user) {
      throw new NotFoundException('User not found!!!');
    }
    return await this.usersRepository.remove(user);
  }
}
