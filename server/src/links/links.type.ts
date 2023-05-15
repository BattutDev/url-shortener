export type LinkMethodType = 'normal' | 'subdomain';

export type PostLinkBodyType = {
  name: string;
  redirect: string;
  method?: LinkMethodType;
};

export type PatchLinkBodyType = {
  name?: string;
  redirect?: string;
  method?: LinkMethodType;
};
