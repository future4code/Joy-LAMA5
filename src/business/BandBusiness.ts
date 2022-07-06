import { band, BandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseError } from "../error/BaseError";
import { MissingFieldsToComplete } from "../error/MissingFieldsToComplete";
import { UserDatabase } from "../data/UserDatabase";
import { BandRepository } from "./BandRepository";


export class BandBusiness {
    constructor(private bandDatabase: BandRepository){}

    async createBand(band: BandInputDTO, token: string) {
        try {
            if (!token) {
                throw new BaseError(400, "Token not found!");
            }

            if (!band.name || !band.musicGenre || !band.responsible) {
                throw new MissingFieldsToComplete();
            }

            const userDatabase = new UserDatabase();
            const authenticator = new Authenticator();

            const getAuthData = authenticator.getData(token)

            if (!getAuthData) {
                throw new BaseError(400, "Token not found!");
            }
            if(getAuthData.role !== "ADMIN"){
                throw new BaseError(401, "Unauthorized user!");
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            // TODO arrumar o errinho dos comentados abaixo (dentro do newBand)

            // const newBand: band = {
            //     id: id,
            //     name,
            //     musicGenre,
            //     responsible
            // }

            // await this.bandDatabase.createBand(newBand)


        } catch (error: any) {
            throw new BaseError(error.statusCode, error.sqlMessage || error.message);
        }
    }
}