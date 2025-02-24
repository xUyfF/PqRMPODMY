% Face replacement
%   - face morphing 
%   - face blending
% 
% @author Yiren Lu & Dongni
% @email luyiren [at] seas [dot] upenn [dot] edu
% @date 12/18/2016
% 
% @input    img_src         source image with replacement face [uint8 0-255]
%           img_dst         target image with face to be replaced [uint8 0-255]
%           face_src        face information for replacement face
%           face_dst        face information for face to be replaced
% @output   img_res         result image with target face being replaced by
%                           replacement face [uint8 0-255]
function [img_res] = face_replacement(img_src, img_dst, face_src, face_dst)
[~, masked_face_src, ctl_pts_src] = crop_face(img_src, face_src);
[BW_dst, masked_face_dst, ctl_pts_dst] = crop_face(img_dst, face_dst);

% disp 'morphing'
addpath ./morphing/
face_morphed = morph_tps_replacement(masked_face_src, masked_face_dst, ctl_pts_src, ctl_pts_dst);
% disp 'blending'
addpath ./blending/
mask = BW_dst&(face_morphed(:,:,1)~=0);
se = strel('sphere',5);
mask = imerode(mask,se);
img_res = seamlessCloningPoisson(face_morphed, img_dst, mask, 0, 0);
end