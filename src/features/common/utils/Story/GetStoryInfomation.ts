
import { redirect } from 'next/navigation'
import { useEffect } from 'react';
import { MEDIA,CATEGORY,WEBSITE,HOW_TO_VIEW } from '../../const/StoryInfoConst'

export function GetStoryMediaName(media: number)
{
    if(media === MEDIA.moba.id){
        return MEDIA.moba.name
    }
    if(media === MEDIA.gs.id){
        return MEDIA.gs.name
    }
    if(media === MEDIA.proe.id){
        return MEDIA.proe.name
    }
    return '';
}
export function GetStoryCategoryName(category: string)
{
    if(category === CATEGORY.main.id){
        return CATEGORY.main.name
    }
    if(category === CATEGORY.event.id){
        return CATEGORY.event.name
    }
    if(category === CATEGORY.idolEpisode.id){
        return CATEGORY.idolEpisode.name
    }
    if(category === CATEGORY.comicNomral.id){
        return CATEGORY.comicNomral.name
    }
    if(category === CATEGORY.comicSpecial.id){
        return CATEGORY.comicSpecial.name
    }
    if(category === CATEGORY.SideMemories.id){
        return CATEGORY.SideMemories.name
    }
    if(category === CATEGORY.dailyOneFrame.id){
        return CATEGORY.dailyOneFrame.name
    }
    if(category === CATEGORY.episodeZero.id){
        return CATEGORY.episodeZero.name
    }
    if(category === CATEGORY.connectWithMusic.id){
        return CATEGORY.connectWithMusic.name
    }
    if(category === CATEGORY.connectWithStage.id){
        return CATEGORY.connectWithStage.name
    }
    if(category === CATEGORY.connectWithOthers.id){
        return CATEGORY.connectWithOthers.name
    }
    if(category === CATEGORY.idolOneFrame.id){
        return CATEGORY.idolOneFrame.name
    }
    return '';
}
export function GetStoryWebsiteName(website: string)
{
    if(website === WEBSITE.youtube.id){
        return WEBSITE.youtube.name
    }
    if(website === WEBSITE.asobiStory.id){
        return WEBSITE.asobiStory.name
    }
    return '';
}
export function GetStoryHowtoviewName(howtoview: string)
{
    if(howtoview === HOW_TO_VIEW.asbLogin.id){
        return HOW_TO_VIEW.asbLogin.name
    }
    if(howtoview === HOW_TO_VIEW.asbPremium.id){
        return  HOW_TO_VIEW.asbPremium.name
    }
    if(howtoview ===  HOW_TO_VIEW.asbPurchase.id){
        return  HOW_TO_VIEW.asbPurchase.name
    }
    if(howtoview ===  HOW_TO_VIEW.asbSerialcodeCD.id){
        return  HOW_TO_VIEW.asbSerialcodeCD.name
    }
    if(howtoview ===  HOW_TO_VIEW.asbSerialcode.id){
        return  HOW_TO_VIEW.asbSerialcode.name
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