type AnyRecord = Record<string, unknown>;

const SINGLE_COMPONENT_FIELDS = [
  'heroBanner',
  'legacyBlock',
  'featuredSectorBlock',
  'finalCta',
  'section01HeroBanner',
  'section02LegacyBlock',
  'section04FeaturedSector',
  'section07FinalCta',
];

const REPEATABLE_COMPONENT_FIELDS = [
  'globalPresenceCards',
  'sectorsCards',
  'partnershipLogos',
  'section03Slides',
  'section05Cards',
  'section06Logos',
];

const COMPONENT_META_KEYS = new Set(['id', '__pivot', '__temp_key__']);

const isMetaOnlyComponentRef = (value: AnyRecord) => {
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((key) => COMPONENT_META_KEYS.has(key));
};

const stripComponentMeta = (value: AnyRecord) => {
  delete value.id;
  delete value.__pivot;
  delete value.__temp_key__;
};

const stripComponentIds = (data: unknown) => {
  if (!data || typeof data !== 'object') return;

  const obj = data as AnyRecord;

  if ('localizations' in obj) {
    const value = obj.localizations;
    if (Array.isArray(value)) {
      const ids = value
        .map((item) => {
          if (typeof item === 'number' || typeof item === 'string') return item;
          if (item && typeof item === 'object' && 'id' in (item as AnyRecord)) {
            const id = (item as AnyRecord).id;
            if (typeof id === 'number' || typeof id === 'string') return id;
          }
          return null;
        })
        .filter((id): id is number | string => id !== null);

      obj.localizations = ids;
    } else {
      delete obj.localizations;
    }
  }

  if ('createdBy' in obj) {
    const value = obj.createdBy;
    if (!value || typeof value !== 'object' || !('id' in (value as AnyRecord))) {
      delete obj.createdBy;
    }
  }

  if ('updatedBy' in obj) {
    const value = obj.updatedBy;
    if (!value || typeof value !== 'object' || !('id' in (value as AnyRecord))) {
      delete obj.updatedBy;
    }
  }

  for (const key of SINGLE_COMPONENT_FIELDS) {
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const componentValue = value as AnyRecord;
      if (isMetaOnlyComponentRef(componentValue)) {
        delete obj[key];
      } else {
        stripComponentMeta(componentValue);
      }
    }
  }

  for (const key of REPEATABLE_COMPONENT_FIELDS) {
    const value = obj[key];
    if (!Array.isArray(value)) continue;

    const cleanedItems: AnyRecord[] = [];

    for (const item of value) {
      if (item && typeof item === 'object') {
        const componentItem = item as AnyRecord;
        if (isMetaOnlyComponentRef(componentItem)) {
          continue;
        }

        stripComponentMeta(componentItem);
        cleanedItems.push(componentItem);
      }
    }

    if (cleanedItems.length > 0) {
      obj[key] = cleanedItems;
    } else {
      delete obj[key];
    }
  }
};

export default {
  beforeCreate(event: { params: { data?: unknown } }) {
    stripComponentIds(event.params?.data);
  },

  beforeUpdate(event: { params: { data?: unknown } }) {
    stripComponentIds(event.params?.data);
  },
};
