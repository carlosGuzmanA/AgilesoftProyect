export interface PeliculasEstreno {
    imageBaseUrl: string;
    data:         DataPeli[];
}

export interface DataPeli {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    imagenUrl:         string;
    imagenUrlPoster:   string;
}

export interface PeliculasReparto {
    imageBaseUrl: string;
    data:         DataReparto[];
}

export interface DataReparto {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: string;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         string;
    cast_id:              number;
    character:            string;
    credit_id:            string;
    imagenUrlProfile:            string;
    order:                number;
}
