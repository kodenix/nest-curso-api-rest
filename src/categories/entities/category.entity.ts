import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category implements ICategory {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'character varying', unique: false })
    name: string;

}

export interface ICategory {
    id: string;
    name: string;
}