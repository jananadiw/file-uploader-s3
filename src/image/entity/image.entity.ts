/* eslint-disable */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  extension: string;

  @Column()
  caption: string;

  @Column()
  url: string;
}