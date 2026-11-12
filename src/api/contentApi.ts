import { supabase } from "../lib/supabase";
import type { ContentInput, ContentItem } from "../types/content";

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

export async function getContents() {
    const {data, error} = await supabase
        .from('contents')
        .select('*')
        .order('created_at', {ascending: false});

    if (error){
        throw error;
    }

    return Promise.all(
        data.map(async (item): Promise<ContentItem>=>({
            id: item.id,
            title: item.title,
            type: item.type,
            genres: item.genres,
            ageRating: item.age_rating,
            director: item.director,
            cast: item.cast,
            synopsis: item.synopsis,
            releaseDate: item.release_date,
            status: item.status,
            thumbnail: item.thumbnail,
            thumbnailUrl: await getThumbnailUrl(item.thumbnail),
            createdAt: item.created_at
        }))
    );
}

export async function getThumbnailUrl(path: string) {
    const {data, error} = await supabase.storage
        .from('content-images')
        .createSignedUrl(path, 3600)
    if (error){
        throw error;
    }

    return data.signedUrl;
}

export async function deleteContents(ids: number[]) {
    if (ids.length === 0) return [];

    const {data, error} = await supabase
        .from('contents')
        .delete()
        .in('id', ids)
        .select('id, thumbnail');

    if (error){
        throw error;
    }

    return data;
}