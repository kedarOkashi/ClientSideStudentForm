

export type City = {
  cityId: number,
  cityName: string
}

export type Student = {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  israeliID: string,
  cityId: number
}

export type ServiceResponse<T> = {
  Data?: T,
  Success?: boolean,
  Message?: string
}


