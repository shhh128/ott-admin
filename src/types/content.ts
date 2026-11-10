export interface ContentInput {
    title: string;
    type: string;
    genres: string[];
    ageRating: string;
    director: string;
    cast: string[];
    synopsis: string;
    releaseDate: string;
    status: string;
    thumbnail: File;
}

export interface ContentItem {
    id: number;
    title: string;
    type: string;
    genres: string[];
    ageRating: string;
    director: string;
    cast: string[];
    synopsis: string;
    releaseDate: string;
    status: string;
    thumbnail: string;
    thumbnailUrl: string;
    createdAt: string;
}