import { api, cacheTags } from 'modules/api';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';
import { editPool } from 'modules/ownerPanel/methods/editPool';
import { IEditPoolArgs } from 'modules/ownerPanel/types';

export const { useEditPoolMutation } = api.injectEndpoints({
  endpoints: build => ({
    editPool: build.mutation<boolean, IEditPoolArgs>({
      queryFn: queryFnNotifyWrapper<IEditPoolArgs, void, boolean>(
        async params => {
          return {
            data: await editPool(params),
          };
        },
      ),
      invalidatesTags: [cacheTags.poolsMeta, cacheTags.pools],
    }),
  }),
});
