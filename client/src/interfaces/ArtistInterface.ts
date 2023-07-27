interface Image {
  height: number;
  url: string;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null | string;
  total: number;
}

export interface ArtistInterface {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
