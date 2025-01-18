import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Complexity } from '../dto/create-boardgame.dto';
import { CustomBoolean } from '../../comics/dto/create-comic.dto';

@Entity('boardgames')
export class Boardgame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  players: string;

  @Column()
  age: string;

  @Column()
  creator: string;

  @Column()
  illustrator: string;

  @Column()
  distributor: string;

  @Column()
  production_company: string;

  @Column()
  games_category: string;

  @Column()
  playing_time: string;

  @Column({
    type: 'enum',
    enum: ['BASSA', 'MEDIA', 'ALTA', 'ALTISSIMA', 'INDEFINITA'],
    default: 'INDEFINITA'
  })
  complexity: Complexity;

  @Column()
  language: string;

  @Column()
  price: string;

  @Column()
  currency: string;

  @Column()
  mancolista: CustomBoolean
}
