const spotifyControllerUtil = {
  removeDuplicates: (data: any[]) => {
    let prev: any;
    return data.filter((item: any) => {
      let arePrevAndCurrSame = prev === item.name;
      prev = item.name;
      return item.album_group !== 'appears_on' && !arePrevAndCurrSame;
    });
  },
  sortByDate: (data: any[]) => {
    return data.sort((a: any, b: any) => {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });
  },
};

export = spotifyControllerUtil;
