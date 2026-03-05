import type { AgeGroupModel } from "./age.model"
import type { TypeModel } from "./type.model"

export interface ToyModel {
    toyId: number
    name: string
    permalink: string
    description: string
    targetGroup: 'svi' | 'devojčica' | 'dečak'
    productionDate: string
    price: number
    imageUrl: string
    ageGroup: AgeGroupModel
    type: TypeModel
  }