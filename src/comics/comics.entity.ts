import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBoolean, Periodicity } from './dto/create-comic.dto';


@Entity('comics')
export class Comics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  author: string

  @Column()
  publisher: string

  @Column()
  distribution: string

  @Column()
  price: string

  @Column()
  currency: string

  @Column()
  language: string

  @Column()
  release_date: string

  @Column({
    type: 'enum',
    enum: ['SETTIMANALE', 'QUINDICINALE', 'MENSILE', 'SEMETRALE', 'ANNUALE', 'VARIABILE'],
    default: 'VARIABILE'
  })
  periodicity: Periodicity

  @Column()
  n_volume: number

  @Column()
  in_progress: CustomBoolean

  @Column()
  mancolista: CustomBoolean

  @Column()
  is_unique: CustomBoolean

  @Column()
  total_volumes: number

}
