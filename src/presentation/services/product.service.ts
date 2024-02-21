import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });
    if (productExists) throw CustomError.badRequest("Product already exists");

    try {
      const product = new ProductModel({
        ...createProductDto,
      });

      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      //Peticiones Separadas
      // const total = await ProductModel.countDocuments();
      // const products = await ProductModel.find()
      //   .skip(page - 1)
      //   .limit(limit);

      //Peticiones Juntas 2 en 1
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip(page - 1)
          .limit(limit)
          .populate("user")
          .populate("category"),
      ]);

      return {
        pagination: {
          page,
          limit,
          total,
        },
        products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
