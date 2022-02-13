//@ts-check

import { defineAbility } from '@casl/ability'

export default defineAbility((can, cannot) => {
  can('read', 'all');
});
