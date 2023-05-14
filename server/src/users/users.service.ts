import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity, { UserSessionType } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RandomGenerator } from 'typeorm/util/RandomGenerator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

export type LoginReturnBodyType = {
  token: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  getById(uid: number): Promise<UserSessionType> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .findOne({
          where: {
            id: uid,
          },
          relations: {
            links: true,
            groups: true,
          },
        })
        .then((user) => {
          if (user) {
            delete user.password;
            resolve(user);
          } else throw new NotFoundException('Cannot found this user');
        })
        .catch(reject);
    });
  }

  login(mail: string, password: string): Promise<LoginReturnBodyType> {
    return new Promise((resolve, reject) => {
      this.userRepository
        .findOne({
          where: {
            mail,
            password: RandomGenerator.sha1(password),
            enabled: true,
          },
        })
        .then(async (user) => {
          if (user) {
            delete user.password;
            const payload = { mail, password };
            const token = this.jwtService.sign(payload, {
              secret:
                'C-pU%){^[Tb9J]p2EE8:jA}Ni5MQ=2qaSJ8Cf;5/m3_;92f8Hf?!Yp5$5(2K*qC5,9VQ9b.8#~d@ju7PNbsgj2VTzkhWh6429T+8',
            });
            await this.cacheManager.set(token, user);
            resolve({
              token,
            });
          } else throw new UnauthorizedException('Bad credentials');
        })
        .catch(reject);
    });
  }

  logout(token: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.cacheManager
        .del(token)
        .then(() => resolve(null))
        .catch(reject);
    });
  }
}
