import { supabase } from "../lib/supabase";
import type { ContentInput } from "../types/content";

export async function uploadThumbnail(file: File) {
    const extension = file.name.split('.').pop();
    const path = `thumbnails/${crypto.randomUUID()}.${extension}`;

    const {data, error} = await supabase.storage
        .from('content-images')
        .upload(path, file);

        if (error){
            throw error;
        }

        return data.path;
}

export async function addContent(
    content: ContentInput,
    thumbnailPath: string
) {
    const {error} = await supabase
        .from('contents')
        .insert({
            title: content.title,
            type: content.type,
            genres: content.genres,
            age_rating: content.ageRating,
            director: content.director,
            cast: content.cast,
            synopsis: content.synopsis,
            release_date: content.releaseDate,
            status: content.status,
            thumbnail: thumbnailPath,
        });

    if (error){
        throw error;
    }
}

export async function removeThumbnail(path: string) {
    const {error} = await supabase.storage
        .from('content-images')
        .remove([path]);
    
    if (error){
        throw error;
    }
}