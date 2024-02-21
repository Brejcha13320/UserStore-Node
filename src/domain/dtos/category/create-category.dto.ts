export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = true } = object;

    if (!name) return ["Missing name"];

    if (typeof available !== "boolean")
      return ["available is not boolean valid"];

    return [undefined, new CreateCategoryDto(name, available)];
  }
}
