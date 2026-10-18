-- Apply only after the owner approves public product photos.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('huerta-images','huerta-images',true,5242880,array['image/jpeg','image/png','image/webp','image/gif']);
create policy huerta_image_upload on storage.objects for insert to authenticated with check(bucket_id='huerta-images' and name ~ '^products/[a-z0-9-]+\.(jpg|png|webp|gif)$' and (select public.is_huerta_admin()));
