
import { redirect } from 'next/navigation'
import { useEffect } from 'react';
import { useParams,useSearchParams,  } from 'next/navigation'

export function GetStoryMediaName(media: number)
{
    if(media === 1){
        return 'モバエム'
    }
    if(media === 2){
        return 'サイスタ'
    }
    if(media === 3){
        return '315プロエピソード'
    }
    return '';
}
export function GetStoryCategoryName(category: string)
{
    if(category === 'main'){
        return 'メインストーリー'
    }
    if(category === 'event'){
        return 'イベント'
    }
    if(category === 'idole'){
        return 'アイドルエピソード'
    }
    if(category === 'comicn'){
        return '雑誌通常号'
    }
    if(category === 'comics'){
        return '雑誌特別号'
    }
    if(category === 'smemo'){
        return 'SideMemories'
    }
    if(category === 'dof'){
        return '日常での１コマ'
    }
    if(category === 'epiz'){
        return 'エピソードゼロ'
    }
    if(category === 'cwm'){
        return 'CONNECT WITH MUSIC！'
    }
    if(category === 'cws'){
        return 'CONNECT WITH STAGE！'
    }
    if(category === 'cwo'){
        return 'CONNECT WITH OTHERS！'
    }
    if(category === 'iof'){
        return 'アイドルたちの１コマ'
    }
    return '';
}
export function GetStoryWebsiteName(website: string)
{
    if(website === 'yt'){
        return 'YouTube'
    }
    if(website === 'asb'){
        return 'アソビストーリー'
    }
    return '';
}
export function GetStoryHowtoviewName(howtoview: string)
{
    if(howtoview === 'asb_login'){
        return 'アソビストアログイン'
    }
    if(howtoview === 'asb_prem'){
        return 'アソビストアプレミアム会員'
    }
    if(howtoview === 'asb_pur'){
        return 'バンダイナムココイン購入'
    }
    if(howtoview === 'asb_scode_cd'){
        return 'CD封入シリアルコード認証'
    }
    if(howtoview === 'asb_scode'){
        return 'シリアルコード認証'
    }
    return '';
}
export function GetVoiceStateName(voice: number, voiceAtRelease: number)
{
    if(voice === 1){
        return 'ボイスあり'
    }
    if(voiceAtRelease === 1){
        return '過去ボイス実装あり'
    }
    return '';
}