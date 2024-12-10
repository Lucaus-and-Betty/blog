import {
  SkipPrevious,
  PlayArrow,
  SkipNext,
  Pause,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Shuffle,
  RepeatOne,
  VolumeUp,
  FormatListBulleted,
  OpenInFull
} from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import musicService from './index.service';
import { SERVER_MUSIC_URL } from '@myConstants/server';
import { MusicInfoType } from './type';
import setUpImg from '@myAssets/pic/diary-cover.jpg';
import './index.less';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [listMode, setListMode] = useState('repeat');
  const [isOpen, setIsOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [musicList, setMusicList] = useState<string[]>([]);
  const [musicInfo, setMusicInfo] = useState<MusicInfoType | null>(null);
  const [musicTime, setMusicTime] = useState('00:00');
  const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [percent, setPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const blackLineRef = useRef<HTMLDivElement | null>(null);
  const cricleRef = useRef<HTMLDivElement | null>(null);
  const playTimeTimeoutRef = useRef<number | null>(null);

  const getMusicList = async () => {
    const res = await musicService.getMusicList();
    if (res.success) {
      setMusicList(res.data.mp3s);
      setCurrentMusicIndex(0);
    } else {
      console.log('获取音乐列表失败', res.data);
    }
  };

  const getMusicInfo = async (name: string) => {
    const res = await musicService.getMusicInfo(name);
    if (res.success) {
      if (res.data.cover !== undefined) {
        res.data.img = arrayBufferToBase64(res.data.cover.imageBuffer.data);
      }
      setMusicInfo(res.data);
    } else {
      console.log('获取音乐信息失败', res.data);
    }
  };

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + window.btoa(binary);
  }

  // 拖动进度条鼠标抬起逻辑
  const mouseUPEvent = useCallback(() => {
    setIsDragging(false);
    // 重新计算进度条的位置
    if (blackLineRef.current && cricleRef.current) {
      const percent = Math.floor((cricleRef.current.offsetLeft / blackLineRef.current.offsetWidth) * 100);
      setPercent(percent);
      setIsPlaying(true);
      audioRef.current?.currentTime && (audioRef.current.currentTime = (percent / 100) * audioRef.current.duration);
    }

    audioRef.current?.addEventListener('timeupdate', controlMusicTimeUpdate);
  }, []);

  const controlMusicTimeUpdate = useCallback(() => {
    // 计算已经播放了百分之多少
    if (!audioRef.current) {
      return;
    }
    const percent = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100);
    setPercent(percent);
    playTimeTimeoutRef.current = setTimeout(() => {
      if (isDragging) {
        return;
      }
      if (!audioRef.current) {
        return;
      }
      setMusicTime(
        `${Math.floor(audioRef.current.currentTime / 60)
          .toString()
          .padStart(2, '0')}:${Math.floor(audioRef.current.currentTime % 60)
          .toString()
          .padStart(2, '0')}`
      );
    }, 1000);
  }, []);

  // 获取音乐
  useEffect(() => {
    getMusicList();

    return () => {
      window.removeEventListener('mouseup', mouseUPEvent);
      if (!playTimeTimeoutRef.current) {
        return;
      }
      clearTimeout(playTimeTimeoutRef.current);
    };
  }, []);

  // 监听鼠标抬起清空 window 鼠标抬起监听
  useEffect(() => {
    if (isDragging) {
      audioRef.current?.removeEventListener('timeupdate', controlMusicTimeUpdate);
    }
    if (!isDragging) {
      window.removeEventListener('mouseup', mouseUPEvent);
    }
  }, [isDragging]);

  // 播放音乐
  useEffect(() => {
    // 播放
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        // 监控播放结束
        audioRef.current.addEventListener('ended', () => {
          if (!audioRef.current) {
            return;
          }
          if (listMode === 'repeat') {
            setCurrentMusicIndex(currentMusicIndex + 1);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else if (listMode === 'repeatOne') {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(false);
          } else if (listMode === 'shuffle') {
            const randomIndex = Math.floor(Math.random() * musicList.length);
            setCurrentMusicIndex(randomIndex);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        });
        // 随时计算播放多少时间
        audioRef.current.addEventListener('timeupdate', controlMusicTimeUpdate);
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioUrl, isPlaying]);

  // 切换歌曲下标控制
  useEffect(() => {
    if (currentMusicIndex > musicList.length - 1) {
      setCurrentMusicIndex(0);
    }

    if (currentMusicIndex < 0) {
      setCurrentMusicIndex(musicList.length - 1);
    }

    if (musicList.length > 0) {
      setAudioUrl(SERVER_MUSIC_URL + musicList[currentMusicIndex]);
      getMusicInfo(musicList[currentMusicIndex]);
    }
  }, [currentMusicIndex]);

  return (
    <div
      className="music-player"
      style={{
        transform: isOpen ? 'translateX(20px)' : 'translateX(-610px)'
      }}
    >
      <div className="music-player-player-panel">
        <div className="music-player-player">
          <div className="music-player-player-title">
            {(musicList.length > 0 &&
              currentMusicIndex >= 0 &&
              currentMusicIndex < musicList.length &&
              musicList[currentMusicIndex].split('.')[0]) ||
              ''}
          </div>
          <div className="music-player-player-line"></div>
          <div className="music-player-player-operation">
            <div
              className="music-player-player-operation-button"
              onClick={() =>
                setListMode(listMode === 'repeat' ? 'shuffle' : listMode === 'shuffle' ? 'repeatOne' : 'repeat')
              }
            >
              {listMode === 'repeat' ? <Repeat /> : listMode === 'shuffle' ? <Shuffle /> : <RepeatOne />}
            </div>
            <div className="music-player-player-operation-button">
              <FormatListBulleted />
            </div>
            <div className="music-player-player-operation-button">
              <VolumeUp />
            </div>
            <div className="music-player-player-operation-button">
              <OpenInFull
                style={{
                  position: 'relative',
                  top: '2px',
                  fontSize: '19px'
                }}
              />
            </div>
          </div>
          <div className="music-player-player-progress">
            <div ref={blackLineRef} className="music-player-player-progress-line-black"></div>
            <div style={{ width: percent + '%' }} className="music-player-player-progress-line-white"></div>
            <div
              ref={cricleRef}
              onMouseDown={() => {
                if (!cricleRef.current) {
                  return;
                }
                setIsDragging(true);

                window.addEventListener('mouseup', mouseUPEvent);
              }}
              onMouseMove={e => {
                if (!cricleRef.current) {
                  return;
                }
                if (!isDragging) {
                  return;
                }
                if (!blackLineRef.current) {
                  return;
                }

                if (e.clientX - 85 <= 0) {
                  cricleRef.current.style.left = '0px';
                } else if (e.clientX - 85 >= blackLineRef.current.clientWidth) {
                  cricleRef.current.style.left = blackLineRef.current.clientWidth + 'px';
                } else {
                  cricleRef.current.style.left = e.clientX - 85 + 'px';
                }
              }}
              style={{ left: percent + '%' }}
              className="music-player-player-progress-line-cricle"
            >
              <div className="music-player-player-progress-line-cricle-point"></div>
            </div>
            <div className="music-player-player-progress-gone-time">{musicTime || '00:00'}</div>
            <div className="music-player-player-progress-all-time">{(musicInfo && musicInfo.duration) || '00:00'}</div>
          </div>
          <div className="music-player-player-control">
            <div
              onClick={() => setCurrentMusicIndex(currentMusicIndex - 1)}
              className="music-player-player-control-button"
            >
              <SkipPrevious />
            </div>
            <div className="music-player-player-control-button" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </div>
            <div
              onClick={() => setCurrentMusicIndex(currentMusicIndex + 1)}
              className="music-player-player-control-button"
            >
              <SkipNext />
            </div>
          </div>
        </div>
        <div className="music-player-record">
          <div className="music-player-record-circle">
            <div className="music-player-record-circle-line">
              <div className="music-player-record-circle-line">
                <div className="music-player-record-circle-line">
                  <div className="music-player-record-circle-line">
                    <div className="music-player-record-circle-line">
                      <div className="music-player-record-circle-image">
                        <img src={(musicInfo && musicInfo.img) || setUpImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="music-player-record-circle-light"></div>
          </div>
        </div>
      </div>
      <div className="music-player-sider-bar" onClick={() => setIsOpen(!isOpen)}>
        <div className="music-player-sider-bar-button">{isOpen ? <ChevronLeft /> : <ChevronRight />}</div>
      </div>
      <audio style={{ display: 'none' }} autoPlay ref={audioRef} src={audioUrl} controls></audio>
    </div>
  );
};

export default MusicPlayer;
