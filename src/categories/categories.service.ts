import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }
  /**
   * Create New Category
   * @param createCategoryDto CreateCategoryDto
   */
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = CreateCategoryDto;
    const foundCategory =  await this.checkIfCategoryExists(name)
    if(!foundCategory) {
      const category = this.categoryRepository.create(createCategoryDto);
      try {
        return await this.categoryRepository.save(category);
      } catch (error) {
        throw new HttpException('Error User Creation ' + error, HttpStatus.BAD_REQUEST);
      }
    }
  }

  /**
   * Get all categories
   */
  async findAll() {
    return await this.categoryRepository.find();
  }

  /**
   * Find just one category by id
   * @param id
   */
  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if(!category) {
      throw new NotFoundException('Category not found!!!');
    }
    return category
  }

  /**
   * Update existing Category
   * @param id number
   * @param updateCategoryDto UpdateCategoryDto
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if(!category) {
      throw new NotFoundException('Category not found!!!');
    }
    const modifiedCategory = {...category, ...updateCategoryDto};
    return await this.categoryRepository.save(modifiedCategory)
  }

  /**
   * Delete an existing Category selected by id
   * @param id number
   */
  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if(!category) {
      throw new NotFoundException('Category not found!!!');
    }
    return await this.categoryRepository.remove(category);
  }

  /**
   * Check if Category exists by name
   * @param name string
   */
  async checkIfCategoryExists(name: string) {
    const foundCategory = await this.categoryRepository.findOne({ where: { name } });
    if (foundCategory) {
      throw new NotFoundException('Category already exists!!!');
    }
    return false
  }
}
