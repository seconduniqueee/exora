import { BaseRepository } from "./base.repository";
import { StoreConfig, withProps } from "@ngneat/elf";
import { PropsFactory } from "@ngneat/elf/src/lib/state";

export abstract class PropRepository<T> extends BaseRepository<T> {
  protected constructor(
    config: StoreConfig,
    initialState: T,
    ...propsFactories: PropsFactory<unknown, unknown>[]
  ) {
    super(config, withProps(initialState), ...propsFactories);
  }
}
