import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';

describe('ProductsController', () => {
  let controller: ProductsController;
 let mockproductsService: Partial< ProductsService> = {
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        JwtService, {provide: ProductsService, useValue: mockproductsService}]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateProductsById', () => {
    it('should update product by ID', async () => {
      const id = 'exampleId';
      const updateProductDto = { name: 'Updated Product', price: 10 };
      const expectedResult = 'exampleResult';

      (mockproductsService.putProductsById as jest.Mock).mockResolvedValue(expectedResult)

      const result = await controller.updateProductsById(id, updateProductDto);

      expect(mockproductsService.putProductsById).toHaveBeenCalledWith(id, updateProductDto);
      expect(result).toEqual(expectedResult);
    });
})

});
