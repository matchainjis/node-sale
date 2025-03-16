import { api, cacheTags } from 'modules/api';
import { getIsOwnerPoolEndpoint } from 'modules/ownerPanel/actions/isPoolOwner';

interface IGetOwnerPoolAddressesArgs {
  poolAddresses: string[];
}

export const { useGetOwnerPoolAddressesQuery } = api.injectEndpoints({
  endpoints: build => ({
    getOwnerPoolAddresses: build.query<string[], IGetOwnerPoolAddressesArgs>({
      queryFn: async ({ poolAddresses }, { dispatch }) => {
        const ownerPoolAddresses = (
          await Promise.all(
            poolAddresses.map(async poolAddress => {
              try {
                const { data: isOwner } = await dispatch(
                  getIsOwnerPoolEndpoint.initiate({
                    poolAddress,
                  }),
                );

                return isOwner ? poolAddress : null;
              } catch {
                return null;
              }
            }),
          )
        ).filter((address): address is string => address !== null);

        return { data: ownerPoolAddresses };
      },
      providesTags: [cacheTags.pools, cacheTags.account],
    }),
  }),
});
