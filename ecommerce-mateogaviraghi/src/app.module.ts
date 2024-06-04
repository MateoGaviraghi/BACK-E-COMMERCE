import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import typeOrmConfig from './config/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { ProductsService } from './Products/products.service';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService ) => configService.get('typeorm'),
    
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule, 
    OrdersModule, 
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '1h'},
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit{
  constructor(
    private readonly productsServices: ProductsService, 
    private readonly categoriesServices: CategoriesService         
  ) {}
  async onModuleInit() {
    
    await this.categoriesServices.addCategories();

   
    await new Promise((resolve) => {
        setTimeout(resolve, 1000); 
    });

    await this.productsServices.addProdcut()
}
}
