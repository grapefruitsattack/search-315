
import subscSongs from '../../../data/subscSongs.json';
import subscAlbums from '../../../data/subscAlbums.json';

const subscServiceNames: {
    id: string;
    name: string;
    nameSub: string;
  }[]=[
    {id:'youtube',name:'YTMusic',nameSub:''}
    ,{id:'amazon',name:'Amazon',nameSub:'\u00a0Music'}
    ,{id:'line',name:'Line',nameSub:'\u00a0Music'}
    ,{id:'apple',name:'Apple',nameSub:'\u00a0Music'}
    ,{id:'spotify',name:'Spotify',nameSub:''}
    ,{id:'awa',name:'AWA',nameSub:''}
    ,{id:'towerrecord',name:'タワレコ',nameSub:'\u00a0Music'}
  ]

export function getSubscUrl(songId: string, albumId: string, subscServiceId: string): string
{
    if(songId==='' && albumId===''){
        return '';
    }

    switch (subscServiceId) {
        case 'youtube':
            if(songId!==''){
                return getYoutubeMusicUrl(songId,albumId,subscSongs.find((data)=>data.id===songId)?.youtubeId||'');
            }
            else {
                return getYoutubeMusicUrl(songId,albumId,subscAlbums.find((data)=>data.id===albumId)?.youtubeId||'');
            };
        case 'amazon':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.amazonMusicUrl||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.amazonMusicUrl||'';
            };
        case 'line':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.lineMusicUrl||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.lineMusicUrl||'';
            };
        case 'apple':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.appleMusicUrl||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.appleMusicUrl||'';
            };
        case 'spotify':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.spotifyUrl||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.spotifyUrl||'';
            };
        case 'awa':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.awaUrl||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.awaUrl||'';
            };
        case 'towerrecord':
            if(songId!==''){
                return subscSongs.find((data)=>data.id===songId)?.towerRecordsMusic||'';
            }
            else {
                return subscAlbums.find((data)=>data.id===albumId)?.towerRecordsMusic||'';
            };
        default:
            return '';
    }
}

export function getYoutubeMusicUrl(songId: string, albumId: string, youtubeId: string): string
{
    if(songId!==''){return `https://music.youtube.com/watch?v=${youtubeId}`}
    else {return `https://music.youtube.com/playlist?list=${youtubeId}`}
}