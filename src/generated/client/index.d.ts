
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Warn
 * 
 */
export type Warn = $Result.DefaultSelection<Prisma.$WarnPayload>
/**
 * Model GuildConfig
 * 
 */
export type GuildConfig = $Result.DefaultSelection<Prisma.$GuildConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Warns
 * const warns = await prisma.warn.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Warns
   * const warns = await prisma.warn.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.warn`: Exposes CRUD operations for the **Warn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warns
    * const warns = await prisma.warn.findMany()
    * ```
    */
  get warn(): Prisma.WarnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guildConfig`: Exposes CRUD operations for the **GuildConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildConfigs
    * const guildConfigs = await prisma.guildConfig.findMany()
    * ```
    */
  get guildConfig(): Prisma.GuildConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.4.1
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Warn: 'Warn',
    GuildConfig: 'GuildConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "warn" | "guildConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Warn: {
        payload: Prisma.$WarnPayload<ExtArgs>
        fields: Prisma.WarnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WarnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WarnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          findFirst: {
            args: Prisma.WarnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WarnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          findMany: {
            args: Prisma.WarnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>[]
          }
          create: {
            args: Prisma.WarnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          createMany: {
            args: Prisma.WarnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WarnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>[]
          }
          delete: {
            args: Prisma.WarnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          update: {
            args: Prisma.WarnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          deleteMany: {
            args: Prisma.WarnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WarnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WarnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>[]
          }
          upsert: {
            args: Prisma.WarnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WarnPayload>
          }
          aggregate: {
            args: Prisma.WarnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWarn>
          }
          groupBy: {
            args: Prisma.WarnGroupByArgs<ExtArgs>
            result: $Utils.Optional<WarnGroupByOutputType>[]
          }
          count: {
            args: Prisma.WarnCountArgs<ExtArgs>
            result: $Utils.Optional<WarnCountAggregateOutputType> | number
          }
        }
      }
      GuildConfig: {
        payload: Prisma.$GuildConfigPayload<ExtArgs>
        fields: Prisma.GuildConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          findFirst: {
            args: Prisma.GuildConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          findMany: {
            args: Prisma.GuildConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>[]
          }
          create: {
            args: Prisma.GuildConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          createMany: {
            args: Prisma.GuildConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>[]
          }
          delete: {
            args: Prisma.GuildConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          update: {
            args: Prisma.GuildConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          deleteMany: {
            args: Prisma.GuildConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>[]
          }
          upsert: {
            args: Prisma.GuildConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildConfigPayload>
          }
          aggregate: {
            args: Prisma.GuildConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildConfig>
          }
          groupBy: {
            args: Prisma.GuildConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildConfigCountArgs<ExtArgs>
            result: $Utils.Optional<GuildConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    warn?: WarnOmit
    guildConfig?: GuildConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Warn
   */

  export type AggregateWarn = {
    _count: WarnCountAggregateOutputType | null
    _avg: WarnAvgAggregateOutputType | null
    _sum: WarnSumAggregateOutputType | null
    _min: WarnMinAggregateOutputType | null
    _max: WarnMaxAggregateOutputType | null
  }

  export type WarnAvgAggregateOutputType = {
    id: number | null
  }

  export type WarnSumAggregateOutputType = {
    id: number | null
  }

  export type WarnMinAggregateOutputType = {
    id: number | null
    guildId: string | null
    userId: string | null
    moderatorId: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type WarnMaxAggregateOutputType = {
    id: number | null
    guildId: string | null
    userId: string | null
    moderatorId: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type WarnCountAggregateOutputType = {
    id: number
    guildId: number
    userId: number
    moderatorId: number
    reason: number
    createdAt: number
    _all: number
  }


  export type WarnAvgAggregateInputType = {
    id?: true
  }

  export type WarnSumAggregateInputType = {
    id?: true
  }

  export type WarnMinAggregateInputType = {
    id?: true
    guildId?: true
    userId?: true
    moderatorId?: true
    reason?: true
    createdAt?: true
  }

  export type WarnMaxAggregateInputType = {
    id?: true
    guildId?: true
    userId?: true
    moderatorId?: true
    reason?: true
    createdAt?: true
  }

  export type WarnCountAggregateInputType = {
    id?: true
    guildId?: true
    userId?: true
    moderatorId?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type WarnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warn to aggregate.
     */
    where?: WarnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warns to fetch.
     */
    orderBy?: WarnOrderByWithRelationInput | WarnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WarnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Warns
    **/
    _count?: true | WarnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarnMaxAggregateInputType
  }

  export type GetWarnAggregateType<T extends WarnAggregateArgs> = {
        [P in keyof T & keyof AggregateWarn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarn[P]>
      : GetScalarType<T[P], AggregateWarn[P]>
  }




  export type WarnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WarnWhereInput
    orderBy?: WarnOrderByWithAggregationInput | WarnOrderByWithAggregationInput[]
    by: WarnScalarFieldEnum[] | WarnScalarFieldEnum
    having?: WarnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarnCountAggregateInputType | true
    _avg?: WarnAvgAggregateInputType
    _sum?: WarnSumAggregateInputType
    _min?: WarnMinAggregateInputType
    _max?: WarnMaxAggregateInputType
  }

  export type WarnGroupByOutputType = {
    id: number
    guildId: string
    userId: string
    moderatorId: string
    reason: string
    createdAt: Date
    _count: WarnCountAggregateOutputType | null
    _avg: WarnAvgAggregateOutputType | null
    _sum: WarnSumAggregateOutputType | null
    _min: WarnMinAggregateOutputType | null
    _max: WarnMaxAggregateOutputType | null
  }

  type GetWarnGroupByPayload<T extends WarnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WarnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarnGroupByOutputType[P]>
            : GetScalarType<T[P], WarnGroupByOutputType[P]>
        }
      >
    >


  export type WarnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    userId?: boolean
    moderatorId?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["warn"]>

  export type WarnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    userId?: boolean
    moderatorId?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["warn"]>

  export type WarnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    userId?: boolean
    moderatorId?: boolean
    reason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["warn"]>

  export type WarnSelectScalar = {
    id?: boolean
    guildId?: boolean
    userId?: boolean
    moderatorId?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type WarnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "guildId" | "userId" | "moderatorId" | "reason" | "createdAt", ExtArgs["result"]["warn"]>

  export type $WarnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Warn"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      guildId: string
      userId: string
      moderatorId: string
      reason: string
      createdAt: Date
    }, ExtArgs["result"]["warn"]>
    composites: {}
  }

  type WarnGetPayload<S extends boolean | null | undefined | WarnDefaultArgs> = $Result.GetResult<Prisma.$WarnPayload, S>

  type WarnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WarnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WarnCountAggregateInputType | true
    }

  export interface WarnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Warn'], meta: { name: 'Warn' } }
    /**
     * Find zero or one Warn that matches the filter.
     * @param {WarnFindUniqueArgs} args - Arguments to find a Warn
     * @example
     * // Get one Warn
     * const warn = await prisma.warn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WarnFindUniqueArgs>(args: SelectSubset<T, WarnFindUniqueArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Warn that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WarnFindUniqueOrThrowArgs} args - Arguments to find a Warn
     * @example
     * // Get one Warn
     * const warn = await prisma.warn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WarnFindUniqueOrThrowArgs>(args: SelectSubset<T, WarnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Warn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnFindFirstArgs} args - Arguments to find a Warn
     * @example
     * // Get one Warn
     * const warn = await prisma.warn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WarnFindFirstArgs>(args?: SelectSubset<T, WarnFindFirstArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Warn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnFindFirstOrThrowArgs} args - Arguments to find a Warn
     * @example
     * // Get one Warn
     * const warn = await prisma.warn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WarnFindFirstOrThrowArgs>(args?: SelectSubset<T, WarnFindFirstOrThrowArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Warns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warns
     * const warns = await prisma.warn.findMany()
     * 
     * // Get first 10 Warns
     * const warns = await prisma.warn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warnWithIdOnly = await prisma.warn.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WarnFindManyArgs>(args?: SelectSubset<T, WarnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Warn.
     * @param {WarnCreateArgs} args - Arguments to create a Warn.
     * @example
     * // Create one Warn
     * const Warn = await prisma.warn.create({
     *   data: {
     *     // ... data to create a Warn
     *   }
     * })
     * 
     */
    create<T extends WarnCreateArgs>(args: SelectSubset<T, WarnCreateArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Warns.
     * @param {WarnCreateManyArgs} args - Arguments to create many Warns.
     * @example
     * // Create many Warns
     * const warn = await prisma.warn.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WarnCreateManyArgs>(args?: SelectSubset<T, WarnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Warns and returns the data saved in the database.
     * @param {WarnCreateManyAndReturnArgs} args - Arguments to create many Warns.
     * @example
     * // Create many Warns
     * const warn = await prisma.warn.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Warns and only return the `id`
     * const warnWithIdOnly = await prisma.warn.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WarnCreateManyAndReturnArgs>(args?: SelectSubset<T, WarnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Warn.
     * @param {WarnDeleteArgs} args - Arguments to delete one Warn.
     * @example
     * // Delete one Warn
     * const Warn = await prisma.warn.delete({
     *   where: {
     *     // ... filter to delete one Warn
     *   }
     * })
     * 
     */
    delete<T extends WarnDeleteArgs>(args: SelectSubset<T, WarnDeleteArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Warn.
     * @param {WarnUpdateArgs} args - Arguments to update one Warn.
     * @example
     * // Update one Warn
     * const warn = await prisma.warn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WarnUpdateArgs>(args: SelectSubset<T, WarnUpdateArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Warns.
     * @param {WarnDeleteManyArgs} args - Arguments to filter Warns to delete.
     * @example
     * // Delete a few Warns
     * const { count } = await prisma.warn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WarnDeleteManyArgs>(args?: SelectSubset<T, WarnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warns
     * const warn = await prisma.warn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WarnUpdateManyArgs>(args: SelectSubset<T, WarnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warns and returns the data updated in the database.
     * @param {WarnUpdateManyAndReturnArgs} args - Arguments to update many Warns.
     * @example
     * // Update many Warns
     * const warn = await prisma.warn.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Warns and only return the `id`
     * const warnWithIdOnly = await prisma.warn.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WarnUpdateManyAndReturnArgs>(args: SelectSubset<T, WarnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Warn.
     * @param {WarnUpsertArgs} args - Arguments to update or create a Warn.
     * @example
     * // Update or create a Warn
     * const warn = await prisma.warn.upsert({
     *   create: {
     *     // ... data to create a Warn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warn we want to update
     *   }
     * })
     */
    upsert<T extends WarnUpsertArgs>(args: SelectSubset<T, WarnUpsertArgs<ExtArgs>>): Prisma__WarnClient<$Result.GetResult<Prisma.$WarnPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Warns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnCountArgs} args - Arguments to filter Warns to count.
     * @example
     * // Count the number of Warns
     * const count = await prisma.warn.count({
     *   where: {
     *     // ... the filter for the Warns we want to count
     *   }
     * })
    **/
    count<T extends WarnCountArgs>(
      args?: Subset<T, WarnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WarnAggregateArgs>(args: Subset<T, WarnAggregateArgs>): Prisma.PrismaPromise<GetWarnAggregateType<T>>

    /**
     * Group by Warn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WarnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarnGroupByArgs['orderBy'] }
        : { orderBy?: WarnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WarnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Warn model
   */
  readonly fields: WarnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Warn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WarnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Warn model
   */ 
  interface WarnFieldRefs {
    readonly id: FieldRef<"Warn", 'Int'>
    readonly guildId: FieldRef<"Warn", 'String'>
    readonly userId: FieldRef<"Warn", 'String'>
    readonly moderatorId: FieldRef<"Warn", 'String'>
    readonly reason: FieldRef<"Warn", 'String'>
    readonly createdAt: FieldRef<"Warn", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Warn findUnique
   */
  export type WarnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter, which Warn to fetch.
     */
    where: WarnWhereUniqueInput
  }

  /**
   * Warn findUniqueOrThrow
   */
  export type WarnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter, which Warn to fetch.
     */
    where: WarnWhereUniqueInput
  }

  /**
   * Warn findFirst
   */
  export type WarnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter, which Warn to fetch.
     */
    where?: WarnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warns to fetch.
     */
    orderBy?: WarnOrderByWithRelationInput | WarnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warns.
     */
    cursor?: WarnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warns.
     */
    distinct?: WarnScalarFieldEnum | WarnScalarFieldEnum[]
  }

  /**
   * Warn findFirstOrThrow
   */
  export type WarnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter, which Warn to fetch.
     */
    where?: WarnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warns to fetch.
     */
    orderBy?: WarnOrderByWithRelationInput | WarnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Warns.
     */
    cursor?: WarnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Warns.
     */
    distinct?: WarnScalarFieldEnum | WarnScalarFieldEnum[]
  }

  /**
   * Warn findMany
   */
  export type WarnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter, which Warns to fetch.
     */
    where?: WarnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Warns to fetch.
     */
    orderBy?: WarnOrderByWithRelationInput | WarnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Warns.
     */
    cursor?: WarnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Warns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Warns.
     */
    skip?: number
    distinct?: WarnScalarFieldEnum | WarnScalarFieldEnum[]
  }

  /**
   * Warn create
   */
  export type WarnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * The data needed to create a Warn.
     */
    data: XOR<WarnCreateInput, WarnUncheckedCreateInput>
  }

  /**
   * Warn createMany
   */
  export type WarnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Warns.
     */
    data: WarnCreateManyInput | WarnCreateManyInput[]
  }

  /**
   * Warn createManyAndReturn
   */
  export type WarnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * The data used to create many Warns.
     */
    data: WarnCreateManyInput | WarnCreateManyInput[]
  }

  /**
   * Warn update
   */
  export type WarnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * The data needed to update a Warn.
     */
    data: XOR<WarnUpdateInput, WarnUncheckedUpdateInput>
    /**
     * Choose, which Warn to update.
     */
    where: WarnWhereUniqueInput
  }

  /**
   * Warn updateMany
   */
  export type WarnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Warns.
     */
    data: XOR<WarnUpdateManyMutationInput, WarnUncheckedUpdateManyInput>
    /**
     * Filter which Warns to update
     */
    where?: WarnWhereInput
    /**
     * Limit how many Warns to update.
     */
    limit?: number
  }

  /**
   * Warn updateManyAndReturn
   */
  export type WarnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * The data used to update Warns.
     */
    data: XOR<WarnUpdateManyMutationInput, WarnUncheckedUpdateManyInput>
    /**
     * Filter which Warns to update
     */
    where?: WarnWhereInput
    /**
     * Limit how many Warns to update.
     */
    limit?: number
  }

  /**
   * Warn upsert
   */
  export type WarnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * The filter to search for the Warn to update in case it exists.
     */
    where: WarnWhereUniqueInput
    /**
     * In case the Warn found by the `where` argument doesn't exist, create a new Warn with this data.
     */
    create: XOR<WarnCreateInput, WarnUncheckedCreateInput>
    /**
     * In case the Warn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WarnUpdateInput, WarnUncheckedUpdateInput>
  }

  /**
   * Warn delete
   */
  export type WarnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
    /**
     * Filter which Warn to delete.
     */
    where: WarnWhereUniqueInput
  }

  /**
   * Warn deleteMany
   */
  export type WarnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Warns to delete
     */
    where?: WarnWhereInput
    /**
     * Limit how many Warns to delete.
     */
    limit?: number
  }

  /**
   * Warn without action
   */
  export type WarnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Warn
     */
    select?: WarnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Warn
     */
    omit?: WarnOmit<ExtArgs> | null
  }


  /**
   * Model GuildConfig
   */

  export type AggregateGuildConfig = {
    _count: GuildConfigCountAggregateOutputType | null
    _min: GuildConfigMinAggregateOutputType | null
    _max: GuildConfigMaxAggregateOutputType | null
  }

  export type GuildConfigMinAggregateOutputType = {
    guildId: string | null
    logChannelId: string | null
  }

  export type GuildConfigMaxAggregateOutputType = {
    guildId: string | null
    logChannelId: string | null
  }

  export type GuildConfigCountAggregateOutputType = {
    guildId: number
    logChannelId: number
    _all: number
  }


  export type GuildConfigMinAggregateInputType = {
    guildId?: true
    logChannelId?: true
  }

  export type GuildConfigMaxAggregateInputType = {
    guildId?: true
    logChannelId?: true
  }

  export type GuildConfigCountAggregateInputType = {
    guildId?: true
    logChannelId?: true
    _all?: true
  }

  export type GuildConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfig to aggregate.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildConfigs
    **/
    _count?: true | GuildConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildConfigMaxAggregateInputType
  }

  export type GetGuildConfigAggregateType<T extends GuildConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildConfig[P]>
      : GetScalarType<T[P], AggregateGuildConfig[P]>
  }




  export type GuildConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildConfigWhereInput
    orderBy?: GuildConfigOrderByWithAggregationInput | GuildConfigOrderByWithAggregationInput[]
    by: GuildConfigScalarFieldEnum[] | GuildConfigScalarFieldEnum
    having?: GuildConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildConfigCountAggregateInputType | true
    _min?: GuildConfigMinAggregateInputType
    _max?: GuildConfigMaxAggregateInputType
  }

  export type GuildConfigGroupByOutputType = {
    guildId: string
    logChannelId: string | null
    _count: GuildConfigCountAggregateOutputType | null
    _min: GuildConfigMinAggregateOutputType | null
    _max: GuildConfigMaxAggregateOutputType | null
  }

  type GetGuildConfigGroupByPayload<T extends GuildConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildConfigGroupByOutputType[P]>
            : GetScalarType<T[P], GuildConfigGroupByOutputType[P]>
        }
      >
    >


  export type GuildConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    logChannelId?: boolean
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    logChannelId?: boolean
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    logChannelId?: boolean
  }, ExtArgs["result"]["guildConfig"]>

  export type GuildConfigSelectScalar = {
    guildId?: boolean
    logChannelId?: boolean
  }

  export type GuildConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"guildId" | "logChannelId", ExtArgs["result"]["guildConfig"]>

  export type $GuildConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      guildId: string
      logChannelId: string | null
    }, ExtArgs["result"]["guildConfig"]>
    composites: {}
  }

  type GuildConfigGetPayload<S extends boolean | null | undefined | GuildConfigDefaultArgs> = $Result.GetResult<Prisma.$GuildConfigPayload, S>

  type GuildConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuildConfigCountAggregateInputType | true
    }

  export interface GuildConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildConfig'], meta: { name: 'GuildConfig' } }
    /**
     * Find zero or one GuildConfig that matches the filter.
     * @param {GuildConfigFindUniqueArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildConfigFindUniqueArgs>(args: SelectSubset<T, GuildConfigFindUniqueArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GuildConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildConfigFindUniqueOrThrowArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GuildConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindFirstArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildConfigFindFirstArgs>(args?: SelectSubset<T, GuildConfigFindFirstArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GuildConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindFirstOrThrowArgs} args - Arguments to find a GuildConfig
     * @example
     * // Get one GuildConfig
     * const guildConfig = await prisma.guildConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GuildConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildConfigs
     * const guildConfigs = await prisma.guildConfig.findMany()
     * 
     * // Get first 10 GuildConfigs
     * const guildConfigs = await prisma.guildConfig.findMany({ take: 10 })
     * 
     * // Only select the `guildId`
     * const guildConfigWithGuildIdOnly = await prisma.guildConfig.findMany({ select: { guildId: true } })
     * 
     */
    findMany<T extends GuildConfigFindManyArgs>(args?: SelectSubset<T, GuildConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GuildConfig.
     * @param {GuildConfigCreateArgs} args - Arguments to create a GuildConfig.
     * @example
     * // Create one GuildConfig
     * const GuildConfig = await prisma.guildConfig.create({
     *   data: {
     *     // ... data to create a GuildConfig
     *   }
     * })
     * 
     */
    create<T extends GuildConfigCreateArgs>(args: SelectSubset<T, GuildConfigCreateArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GuildConfigs.
     * @param {GuildConfigCreateManyArgs} args - Arguments to create many GuildConfigs.
     * @example
     * // Create many GuildConfigs
     * const guildConfig = await prisma.guildConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildConfigCreateManyArgs>(args?: SelectSubset<T, GuildConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuildConfigs and returns the data saved in the database.
     * @param {GuildConfigCreateManyAndReturnArgs} args - Arguments to create many GuildConfigs.
     * @example
     * // Create many GuildConfigs
     * const guildConfig = await prisma.guildConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuildConfigs and only return the `guildId`
     * const guildConfigWithGuildIdOnly = await prisma.guildConfig.createManyAndReturn({
     *   select: { guildId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GuildConfig.
     * @param {GuildConfigDeleteArgs} args - Arguments to delete one GuildConfig.
     * @example
     * // Delete one GuildConfig
     * const GuildConfig = await prisma.guildConfig.delete({
     *   where: {
     *     // ... filter to delete one GuildConfig
     *   }
     * })
     * 
     */
    delete<T extends GuildConfigDeleteArgs>(args: SelectSubset<T, GuildConfigDeleteArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GuildConfig.
     * @param {GuildConfigUpdateArgs} args - Arguments to update one GuildConfig.
     * @example
     * // Update one GuildConfig
     * const guildConfig = await prisma.guildConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildConfigUpdateArgs>(args: SelectSubset<T, GuildConfigUpdateArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GuildConfigs.
     * @param {GuildConfigDeleteManyArgs} args - Arguments to filter GuildConfigs to delete.
     * @example
     * // Delete a few GuildConfigs
     * const { count } = await prisma.guildConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildConfigDeleteManyArgs>(args?: SelectSubset<T, GuildConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildConfigs
     * const guildConfig = await prisma.guildConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildConfigUpdateManyArgs>(args: SelectSubset<T, GuildConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildConfigs and returns the data updated in the database.
     * @param {GuildConfigUpdateManyAndReturnArgs} args - Arguments to update many GuildConfigs.
     * @example
     * // Update many GuildConfigs
     * const guildConfig = await prisma.guildConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuildConfigs and only return the `guildId`
     * const guildConfigWithGuildIdOnly = await prisma.guildConfig.updateManyAndReturn({
     *   select: { guildId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GuildConfig.
     * @param {GuildConfigUpsertArgs} args - Arguments to update or create a GuildConfig.
     * @example
     * // Update or create a GuildConfig
     * const guildConfig = await prisma.guildConfig.upsert({
     *   create: {
     *     // ... data to create a GuildConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildConfig we want to update
     *   }
     * })
     */
    upsert<T extends GuildConfigUpsertArgs>(args: SelectSubset<T, GuildConfigUpsertArgs<ExtArgs>>): Prisma__GuildConfigClient<$Result.GetResult<Prisma.$GuildConfigPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GuildConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigCountArgs} args - Arguments to filter GuildConfigs to count.
     * @example
     * // Count the number of GuildConfigs
     * const count = await prisma.guildConfig.count({
     *   where: {
     *     // ... the filter for the GuildConfigs we want to count
     *   }
     * })
    **/
    count<T extends GuildConfigCountArgs>(
      args?: Subset<T, GuildConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildConfigAggregateArgs>(args: Subset<T, GuildConfigAggregateArgs>): Prisma.PrismaPromise<GetGuildConfigAggregateType<T>>

    /**
     * Group by GuildConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildConfigGroupByArgs['orderBy'] }
        : { orderBy?: GuildConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildConfig model
   */
  readonly fields: GuildConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildConfig model
   */ 
  interface GuildConfigFieldRefs {
    readonly guildId: FieldRef<"GuildConfig", 'String'>
    readonly logChannelId: FieldRef<"GuildConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GuildConfig findUnique
   */
  export type GuildConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig findUniqueOrThrow
   */
  export type GuildConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig findFirst
   */
  export type GuildConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig findFirstOrThrow
   */
  export type GuildConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter, which GuildConfig to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildConfigs.
     */
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig findMany
   */
  export type GuildConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter, which GuildConfigs to fetch.
     */
    where?: GuildConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildConfigs to fetch.
     */
    orderBy?: GuildConfigOrderByWithRelationInput | GuildConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildConfigs.
     */
    cursor?: GuildConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildConfigs.
     */
    skip?: number
    distinct?: GuildConfigScalarFieldEnum | GuildConfigScalarFieldEnum[]
  }

  /**
   * GuildConfig create
   */
  export type GuildConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a GuildConfig.
     */
    data: XOR<GuildConfigCreateInput, GuildConfigUncheckedCreateInput>
  }

  /**
   * GuildConfig createMany
   */
  export type GuildConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildConfigs.
     */
    data: GuildConfigCreateManyInput | GuildConfigCreateManyInput[]
  }

  /**
   * GuildConfig createManyAndReturn
   */
  export type GuildConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * The data used to create many GuildConfigs.
     */
    data: GuildConfigCreateManyInput | GuildConfigCreateManyInput[]
  }

  /**
   * GuildConfig update
   */
  export type GuildConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a GuildConfig.
     */
    data: XOR<GuildConfigUpdateInput, GuildConfigUncheckedUpdateInput>
    /**
     * Choose, which GuildConfig to update.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig updateMany
   */
  export type GuildConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildConfigs.
     */
    data: XOR<GuildConfigUpdateManyMutationInput, GuildConfigUncheckedUpdateManyInput>
    /**
     * Filter which GuildConfigs to update
     */
    where?: GuildConfigWhereInput
    /**
     * Limit how many GuildConfigs to update.
     */
    limit?: number
  }

  /**
   * GuildConfig updateManyAndReturn
   */
  export type GuildConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * The data used to update GuildConfigs.
     */
    data: XOR<GuildConfigUpdateManyMutationInput, GuildConfigUncheckedUpdateManyInput>
    /**
     * Filter which GuildConfigs to update
     */
    where?: GuildConfigWhereInput
    /**
     * Limit how many GuildConfigs to update.
     */
    limit?: number
  }

  /**
   * GuildConfig upsert
   */
  export type GuildConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the GuildConfig to update in case it exists.
     */
    where: GuildConfigWhereUniqueInput
    /**
     * In case the GuildConfig found by the `where` argument doesn't exist, create a new GuildConfig with this data.
     */
    create: XOR<GuildConfigCreateInput, GuildConfigUncheckedCreateInput>
    /**
     * In case the GuildConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildConfigUpdateInput, GuildConfigUncheckedUpdateInput>
  }

  /**
   * GuildConfig delete
   */
  export type GuildConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
    /**
     * Filter which GuildConfig to delete.
     */
    where: GuildConfigWhereUniqueInput
  }

  /**
   * GuildConfig deleteMany
   */
  export type GuildConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildConfigs to delete
     */
    where?: GuildConfigWhereInput
    /**
     * Limit how many GuildConfigs to delete.
     */
    limit?: number
  }

  /**
   * GuildConfig without action
   */
  export type GuildConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildConfig
     */
    select?: GuildConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildConfig
     */
    omit?: GuildConfigOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WarnScalarFieldEnum: {
    id: 'id',
    guildId: 'guildId',
    userId: 'userId',
    moderatorId: 'moderatorId',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type WarnScalarFieldEnum = (typeof WarnScalarFieldEnum)[keyof typeof WarnScalarFieldEnum]


  export const GuildConfigScalarFieldEnum: {
    guildId: 'guildId',
    logChannelId: 'logChannelId'
  };

  export type GuildConfigScalarFieldEnum = (typeof GuildConfigScalarFieldEnum)[keyof typeof GuildConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type WarnWhereInput = {
    AND?: WarnWhereInput | WarnWhereInput[]
    OR?: WarnWhereInput[]
    NOT?: WarnWhereInput | WarnWhereInput[]
    id?: IntFilter<"Warn"> | number
    guildId?: StringFilter<"Warn"> | string
    userId?: StringFilter<"Warn"> | string
    moderatorId?: StringFilter<"Warn"> | string
    reason?: StringFilter<"Warn"> | string
    createdAt?: DateTimeFilter<"Warn"> | Date | string
  }

  export type WarnOrderByWithRelationInput = {
    id?: SortOrder
    guildId?: SortOrder
    userId?: SortOrder
    moderatorId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WarnWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WarnWhereInput | WarnWhereInput[]
    OR?: WarnWhereInput[]
    NOT?: WarnWhereInput | WarnWhereInput[]
    guildId?: StringFilter<"Warn"> | string
    userId?: StringFilter<"Warn"> | string
    moderatorId?: StringFilter<"Warn"> | string
    reason?: StringFilter<"Warn"> | string
    createdAt?: DateTimeFilter<"Warn"> | Date | string
  }, "id">

  export type WarnOrderByWithAggregationInput = {
    id?: SortOrder
    guildId?: SortOrder
    userId?: SortOrder
    moderatorId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    _count?: WarnCountOrderByAggregateInput
    _avg?: WarnAvgOrderByAggregateInput
    _max?: WarnMaxOrderByAggregateInput
    _min?: WarnMinOrderByAggregateInput
    _sum?: WarnSumOrderByAggregateInput
  }

  export type WarnScalarWhereWithAggregatesInput = {
    AND?: WarnScalarWhereWithAggregatesInput | WarnScalarWhereWithAggregatesInput[]
    OR?: WarnScalarWhereWithAggregatesInput[]
    NOT?: WarnScalarWhereWithAggregatesInput | WarnScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Warn"> | number
    guildId?: StringWithAggregatesFilter<"Warn"> | string
    userId?: StringWithAggregatesFilter<"Warn"> | string
    moderatorId?: StringWithAggregatesFilter<"Warn"> | string
    reason?: StringWithAggregatesFilter<"Warn"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Warn"> | Date | string
  }

  export type GuildConfigWhereInput = {
    AND?: GuildConfigWhereInput | GuildConfigWhereInput[]
    OR?: GuildConfigWhereInput[]
    NOT?: GuildConfigWhereInput | GuildConfigWhereInput[]
    guildId?: StringFilter<"GuildConfig"> | string
    logChannelId?: StringNullableFilter<"GuildConfig"> | string | null
  }

  export type GuildConfigOrderByWithRelationInput = {
    guildId?: SortOrder
    logChannelId?: SortOrderInput | SortOrder
  }

  export type GuildConfigWhereUniqueInput = Prisma.AtLeast<{
    guildId?: string
    AND?: GuildConfigWhereInput | GuildConfigWhereInput[]
    OR?: GuildConfigWhereInput[]
    NOT?: GuildConfigWhereInput | GuildConfigWhereInput[]
    logChannelId?: StringNullableFilter<"GuildConfig"> | string | null
  }, "guildId">

  export type GuildConfigOrderByWithAggregationInput = {
    guildId?: SortOrder
    logChannelId?: SortOrderInput | SortOrder
    _count?: GuildConfigCountOrderByAggregateInput
    _max?: GuildConfigMaxOrderByAggregateInput
    _min?: GuildConfigMinOrderByAggregateInput
  }

  export type GuildConfigScalarWhereWithAggregatesInput = {
    AND?: GuildConfigScalarWhereWithAggregatesInput | GuildConfigScalarWhereWithAggregatesInput[]
    OR?: GuildConfigScalarWhereWithAggregatesInput[]
    NOT?: GuildConfigScalarWhereWithAggregatesInput | GuildConfigScalarWhereWithAggregatesInput[]
    guildId?: StringWithAggregatesFilter<"GuildConfig"> | string
    logChannelId?: StringNullableWithAggregatesFilter<"GuildConfig"> | string | null
  }

  export type WarnCreateInput = {
    guildId: string
    userId: string
    moderatorId: string
    reason: string
    createdAt?: Date | string
  }

  export type WarnUncheckedCreateInput = {
    id?: number
    guildId: string
    userId: string
    moderatorId: string
    reason: string
    createdAt?: Date | string
  }

  export type WarnUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarnUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    guildId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarnCreateManyInput = {
    id?: number
    guildId: string
    userId: string
    moderatorId: string
    reason: string
    createdAt?: Date | string
  }

  export type WarnUpdateManyMutationInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WarnUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    guildId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildConfigCreateInput = {
    guildId: string
    logChannelId?: string | null
  }

  export type GuildConfigUncheckedCreateInput = {
    guildId: string
    logChannelId?: string | null
  }

  export type GuildConfigUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    logChannelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildConfigUncheckedUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    logChannelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildConfigCreateManyInput = {
    guildId: string
    logChannelId?: string | null
  }

  export type GuildConfigUpdateManyMutationInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    logChannelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildConfigUncheckedUpdateManyInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    logChannelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WarnCountOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    userId?: SortOrder
    moderatorId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WarnAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WarnMaxOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    userId?: SortOrder
    moderatorId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WarnMinOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    userId?: SortOrder
    moderatorId?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type WarnSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GuildConfigCountOrderByAggregateInput = {
    guildId?: SortOrder
    logChannelId?: SortOrder
  }

  export type GuildConfigMaxOrderByAggregateInput = {
    guildId?: SortOrder
    logChannelId?: SortOrder
  }

  export type GuildConfigMinOrderByAggregateInput = {
    guildId?: SortOrder
    logChannelId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}