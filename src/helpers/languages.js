export const getLangLabel = (langValue, allLangs) => {
  const language = allLangs?.find((lang) => lang.value === langValue);

  return language?.label ?? '';
};
