/* eslint-disable */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @Column()
  url: string;
}