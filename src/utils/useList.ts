import { useState } from 'react';

import { DEFAULT_TABLE_LIMIT } from './constants';
import { deepClone } from './helpers';

type useListProps = {
  queryParams?: {
    limit?: number;
    page?: number;
    search?: string;
    start_date?: string;
    end_date?: string;
    status?: number;
    id?: any;
    postalCode?: string | undefined;
    randomString?: string;
  };
};

export const useList = ({
  queryParams = {
    limit: DEFAULT_TABLE_LIMIT,
    page: 1,
  },
}: useListProps) => {
  const [apiParam, setApiParam] = useState({ ...queryParams });

  const handleOnTableChange = ({ pagination, sorter }: any) => {
    setApiParam((d) => {
      const temp = deepClone(d);
      if (pagination) {
        temp.skip = pagination?.skip;
      }
      if (sorter?.orderBy) {
        temp.orderBy = sorter?.orderBy;
      }
      const newValue = deepClone(temp);
      return newValue;
    });
  };

  return {
    apiParam,
    setApiParam,
    handleOnTableChange,
  };
};

export default useList;
