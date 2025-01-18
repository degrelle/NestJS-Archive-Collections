import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardgameDto } from './dto/create-boardgame.dto';
import { UpdateBoardgameDto } from './dto/update-boardgame.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Boardgame } from './entities/boardgame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardgamesService {
  constructor(@InjectRepository(Boardgame) private readonly boardgamesRepository: Repository<Boardgame>) {
  }

  /**
   * Create a new Boardgame
   * @param createBoardgameDto CreateBoardgameDto
   */
  async create(createBoardgameDto: CreateBoardgameDto): Promise<Boardgame> {
    const { name } = createBoardgameDto
    const findBoardgame = await this.checkIfBoardgameExists(name)
    if(!findBoardgame) {
      const boardgame = this.boardgamesRepository.create(createBoardgameDto)
      try {
        return await this.boardgamesRepository.save(boardgame)
      } catch (error) {
        throw new HttpException('Error Boardgame Creation ' + error, HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new NotFoundException('A boardgame with this name already exists!!!')
    }
  }

  /**
   * Get all boardgames
   */
  async findAll(): Promise<Boardgame[]> {
    return await this.boardgamesRepository.find()
  }

  /**
   * Find just one Boardgame by id
   * @param id number
   */
  async findOne(id: number): Promise<Boardgame> {
    const boardgame = await this.boardgamesRepository.findOne({ where: { id } })
    if(!boardgame) {
      throw new NotFoundException('Boardgame not found!!!')
    }
    return boardgame
  }

  /**
   * Update existing Comic
   * @param id number
   * @param updateBoardgameDto UpdateBoardgameDto
   */
  async update(id: number, updateBoardgameDto: UpdateBoardgameDto): Promise<Boardgame> {
    const boardgame = await this.boardgamesRepository.findOne({ where: { id } })
    if(!boardgame) {
      throw new NotFoundException('Boardgame not found!!!')
    }
    const modifyBoardgame = {...boardgame, ...updateBoardgameDto}
    return await this.boardgamesRepository.save(modifyBoardgame)
  }

  /**
   * Delete boardgame by id
   * @param id number
   */
  async remove(id: number): Promise<Boardgame> {
    const boardgame = await this.boardgamesRepository.findOne({ where: { id } })
    if(!boardgame) {
      throw new NotFoundException('Boardgame not found!!!')
    }
    return await this.boardgamesRepository.remove(boardgame)
  }

  /**
   * Check if boardgame with a specific title is present
   * @param name string
   */
  async checkIfBoardgameExists(name: string) {
    const findBoardgame = await this.boardgamesRepository.findOne({
      where: {
        name: name
      }
    })
    if (findBoardgame) {
      throw new NotFoundException('Boardgame already exists!!!')
    }
    return false
  }
}
