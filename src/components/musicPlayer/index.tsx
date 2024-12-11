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
  const mode = useRef('repeat');
  const [isOpen, setIsOpen] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [musicList, setMusicList] = useState<string[]>([]);
  const musicListLength = useRef(0);
  const [musicInfo, setMusicInfo] = useState<MusicInfoType | null>(null);
  const [musicTime, setMusicTime] = useState('00:00');
  const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [percent, setPercent] = useState(0);
  const playTimeTimeoutRef = useRef<number | null>(null);
  const progressLineCricleRef = useRef<HTMLDivElement | null>(null);
  const blackLineRef = useRef<HTMLDivElement | null>(null);
  const whiteLineRef = useRef<HTMLDivElement | null>(null);

  const getMusicList = async () => {
    const res = await musicService.getMusicList();
    if (res.success) {
      setMusicList(res.data.mp3s);
      musicListLength.current = res.data.count;
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

  const controlMusicTimeUpdate = useCallback(() => {
    // 计算已经播放了百分之多少
    if (!audioRef.current) {
      return;
    }
    const percent = Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100);
    setPercent(percent);
    playTimeTimeoutRef.current = setTimeout(() => {
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

  const changeMusicProgressDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) {
      return;
    }

    if (!progressLineCricleRef.current) {
      return;
    }

    // 获取光标现在的位置
    const startX = e.clientX;
    // 获取目前圆圈的 left
    const cricleLeft = Number(progressLineCricleRef.current.style.left.split('%')[0]);

    const windowMouseUp = () => {
      if (!audioRef.current) {
        return;
      }
      if (!progressLineCricleRef.current) {
        return;
      }
      // 获取目前圆圈的 left 赋值回去
      const cricleLeft = progressLineCricleRef.current.style.left;
      setPercent(Number(cricleLeft.split('%')[0]));

      // 调整音频播放进度
      audioRef.current.currentTime = (audioRef.current.duration * Number(cricleLeft.split('%')[0])) / 100;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.addEventListener('timeupdate', controlMusicTimeUpdate);
      window.removeEventListener('mouseup', windowMouseUp);
      window.removeEventListener('mousemove', windowMouseMove);
    };

    const windowMouseMove = (e: MouseEvent) => {
      if (!audioRef.current) {
        return;
      }
      if (!progressLineCricleRef.current) {
        return;
      }
      if (!blackLineRef.current) {
        return;
      }
      if (!whiteLineRef.current) {
        return;
      }
      // 打印相对于起始点的偏移量
      const moveX = e.clientX - startX;
      // 将移动偏移量转换成百分比
      const percentX = moveX / blackLineRef.current.clientWidth;
      progressLineCricleRef.current.style.left = `${cricleLeft + percentX * 100}%`;
      whiteLineRef.current.style.width = `${cricleLeft + percentX * 100}%`;
      // 计算时间
      setMusicTime(
        `${Math.floor((audioRef.current.duration * (cricleLeft + percentX * 100)) / 100 / 60)
          .toString()
          .padStart(2, '0')}:${Math.floor(((audioRef.current.duration * (cricleLeft + percentX * 100)) / 100) % 60)
          .toString()
          .padStart(2, '0')}`
      );
      // 边界判断
      if (cricleLeft + percentX * 100 > 100) {
        progressLineCricleRef.current.style.left = '100%';
        whiteLineRef.current.style.width = '100%';
        setMusicTime(
          `${Math.floor(audioRef.current.duration / 60)
            .toString()
            .padStart(2, '0')}:${Math.floor(audioRef.current.duration % 60)
            .toString()
            .padStart(2, '0')}`
        );
      }
      if (cricleLeft + percentX * 100 < 0) {
        progressLineCricleRef.current.style.left = '0%';
        whiteLineRef.current.style.width = '0%';
        setMusicTime('00:00');
      }
    };

    window.addEventListener('mousemove', windowMouseMove);
    window.addEventListener('mouseup', windowMouseUp);
    audioRef.current.removeEventListener('timeupdate', controlMusicTimeUpdate);
  };

  const musicEnded = () => {
    if (mode.current === 'repeat') {
      setCurrentMusicIndex(pre => pre + 1);
    } else if (mode.current === 'shuffle') {
      setCurrentMusicIndex(pre => {
        const randomNumber = Math.random();
        const random = pre + Math.floor(randomNumber * musicListLength.current) - pre;
        if (random === pre) {
          return pre + 1;
        }
        return random;
      });
    } else if (mode.current === 'repeatOne') {
      if (!audioRef.current) {
        return;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 获取音乐
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.addEventListener('ended', musicEnded);

    getMusicList();

    return () => {
      if (!playTimeTimeoutRef.current) {
        return;
      }
      clearTimeout(playTimeTimeoutRef.current);
    };
  }, []);

  // 播放音乐
  useEffect(() => {
    // 播放
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        // 随时计算播放多少时间
        audioRef.current.addEventListener('timeupdate', controlMusicTimeUpdate);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 切换歌曲下标控制
  useEffect(() => {
    if (currentMusicIndex > musicList.length - 1) {
      setCurrentMusicIndex(0);
      return;
    }

    if (currentMusicIndex < 0) {
      setCurrentMusicIndex(musicList.length - 1);
      return;
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
              onClick={() => {
                setListMode(listMode === 'repeat' ? 'shuffle' : listMode === 'shuffle' ? 'repeatOne' : 'repeat');
                mode.current = listMode === 'repeat' ? 'shuffle' : listMode === 'shuffle' ? 'repeatOne' : 'repeat';
              }}
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
            <div
              ref={whiteLineRef}
              style={{ width: percent + '%' }}
              className="music-player-player-progress-line-white"
            ></div>
            <div
              ref={progressLineCricleRef}
              onMouseDown={changeMusicProgressDown}
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
              onClick={() => {
                setCurrentMusicIndex(currentMusicIndex - 1);
                setPercent(0);
              }}
              className="music-player-player-control-button"
            >
              <SkipPrevious />
            </div>
            <div className="music-player-player-control-button" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </div>
            <div
              onClick={() => {
                setCurrentMusicIndex(currentMusicIndex + 1);
                setPercent(0);
              }}
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
