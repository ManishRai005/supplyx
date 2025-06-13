import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Error = { 'InvalidInput' : null } |
  { 'ProductNotFound' : null } |
  { 'Unauthorized' : null };
export interface Material {
  'source' : string,
  'name' : string,
  'percentage' : number,
}
export interface Product {
  'id' : string,
  'status' : string,
  'manufacturer' : Principal,
  'name' : string,
  'description' : string,
  'materials' : Array<Material>,
  'ethical_score' : number,
  'certifications' : Array<string>,
  'timeline' : Array<TimelineEvent>,
}
export interface ProductStage {
  'handler' : string,
  'description' : string,
  'timestamp' : bigint,
  'certifications' : Array<string>,
  'stage_id' : string,
  'location' : string,
}
export interface TimelineEvent {
  'date' : string,
  'event' : string,
  'location' : string,
}
export interface TransferRequest {
  'product_id' : string,
  'recipient' : Principal,
  'notes' : string,
  'location' : string,
}
export interface _SERVICE {
  'add_product' : ActorMethod<[string, string], string>,
  'add_stage' : ActorMethod<
    [string, string, string, Array<string>, string],
    boolean
  >,
  'create_product' : ActorMethod<
    [Product],
    { 'Ok' : string } |
      { 'Err' : Error }
  >,
  'get_product' : ActorMethod<[string], { 'Ok' : Product } | { 'Err' : Error }>,
  'get_product_history' : ActorMethod<[string], Array<ProductStage>>,
  'get_products' : ActorMethod<[], Array<Product>>,
  'transfer_product' : ActorMethod<
    [TransferRequest],
    { 'Ok' : string } |
      { 'Err' : Error }
  >,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
