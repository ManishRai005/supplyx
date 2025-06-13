export const idlFactory = ({ IDL }) => {
  const Material = IDL.Record({
    'source' : IDL.Text,
    'name' : IDL.Text,
    'percentage' : IDL.Nat32,
  });
  const TimelineEvent = IDL.Record({
    'date' : IDL.Text,
    'event' : IDL.Text,
    'location' : IDL.Text,
  });
  const Product = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'manufacturer' : IDL.Principal,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'materials' : IDL.Vec(Material),
    'ethical_score' : IDL.Nat32,
    'certifications' : IDL.Vec(IDL.Text),
    'timeline' : IDL.Vec(TimelineEvent),
  });
  const Error = IDL.Variant({
    'InvalidInput' : IDL.Null,
    'ProductNotFound' : IDL.Null,
    'Unauthorized' : IDL.Null,
  });
  const ProductStage = IDL.Record({
    'handler' : IDL.Text,
    'description' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'certifications' : IDL.Vec(IDL.Text),
    'stage_id' : IDL.Text,
    'location' : IDL.Text,
  });
  const TransferRequest = IDL.Record({
    'product_id' : IDL.Text,
    'recipient' : IDL.Principal,
    'notes' : IDL.Text,
    'location' : IDL.Text,
  });
  return IDL.Service({
    'add_product' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'add_stage' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text), IDL.Text],
        [IDL.Bool],
        [],
      ),
    'create_product' : IDL.Func(
        [Product],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : Error })],
        [],
      ),
    'get_product' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : Product, 'Err' : Error })],
        ['query'],
      ),
    'get_product_history' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(ProductStage)],
        ['query'],
      ),
    'get_products' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'transfer_product' : IDL.Func(
        [TransferRequest],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : Error })],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
