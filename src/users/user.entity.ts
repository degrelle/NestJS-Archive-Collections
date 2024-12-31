import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './dto/create-user.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password_hash: string;
  @Column({
    type: 'enum',
    enum: ['ADMIN', 'SUPERVISOR', 'EDITOR', 'SIMPLE_USER'],
    default: 'SIMPLE_USER'
  })
  role: UserRole
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  telephone: number;
  @Column()
  address: string;
  @Column()
  email: string;
}
