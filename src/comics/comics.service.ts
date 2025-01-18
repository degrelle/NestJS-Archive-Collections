import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comics } from './comics.entity';
import { Repository } from 'typeorm';
import { CreateComicDto, CustomBoolean } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Injectable()
export class ComicsService {
  constructor(@InjectRepository(Comics) private readonly comicsRepository: Repository<Comics>) {}

  /**
   * Get all comics
   */
  async findAll(): Promise<Comics[]> {
    return await this.comicsRepository.find()
  }

  /**
   * Find just one comic by id
   * @param id number
   */
  async findOne(id: number): Promise<Comics> {
    const comic = await this.comicsRepository.findOne({ where: { id } })
    if(!comic) {
      throw new NotFoundException('Comic not found!!!')
    }
    return comic
  }

  /**
   * Find all comics present in "mancolista" filter
   * @param mancolista CustomBoolean
   */
  async findAllMancolista(mancolista: CustomBoolean) {
    const mancoArray = await this.comicsRepository.find({
      where: {
        mancolista: mancolista
      }
    })
    if(mancoArray.length === 0) throw new NotFoundException('Comics in Mancolista category not found');
    return mancoArray
  }

  /**
   * Check if comic with a specific title and volume number is present
   * @param title string
   * @param n_volume number
   */
  async checkIfComicExists(title: string, n_volume: number) {
    const findComic = await this.comicsRepository.findOne({
      where: {
        title: title,
        n_volume: n_volume,
      }
    })
    if (findComic) {
      throw new NotFoundException('Comic already exists!!!')
    }
    return false
  }

  /**
   * Create a new Comic
   * @param createComicDto CreateComicDto
   */
  async create(createComicDto: CreateComicDto): Promise<Comics> {
    const { title, n_volume } = createComicDto
    const findComic = await this.checkIfComicExists(title, n_volume)
    if(!findComic) {
      const comic = this.comicsRepository.create(createComicDto)
      try {
        return await this.comicsRepository.save(comic)
      } catch (error) {
        throw new HttpException('Error Comic Creation ' + error, HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new NotFoundException('A comic with this title and volume number already exists!!!')
    }
  }

  /**
   * Update existing Comic
   * @param id number
   * @param updateComicDto UpdateComicDto
   */
  async update(id: number, updateComicDto: UpdateComicDto): Promise<Comics> {
    const comic = await this.comicsRepository.findOne({ where: { id } })
    if(!comic) {
      throw new NotFoundException('Comic not found!!!')
    }
    const modifyComic = {...comic, ...updateComicDto}
    return await this.comicsRepository.save(modifyComic)
  }

  /**
   * Delete comic by id
   * @param id number
   */
  async delete(id: number): Promise<Comics> {
    const comic = await this.comicsRepository.findOne({ where: { id } })
    if(!comic) {
      throw new NotFoundException('Comic not found!!!')
    }
    return await this.comicsRepository.remove(comic)
  }

}
