# 9장 HTTP 통신과 Ajax
* 코드 실행(GitHub Page): <https://febc-15.github.io/react/workspace-ins/index.html#09>

## 목차
- [1. HTTP 프로토콜](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#1-HTTP-프로토콜)
- [2. API 테스트](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#2-api-테스트)
- [3. Ajax란?](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#3-ajax란)
- [4. XMLHttpRequest 객체](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#4-xmlhttprequest-객체)
- [5. Fetch API](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#5-fetch-api)
- [6. axios 라이브러리](https://github.com/FEBC-15/js/blob/main/docs/09.js_ajax.md#6-axios-라이브러리)
- [7. React Query(TanStack Query)](#7-react-querytanstack-query)
  - [7.1 설치](#71-설치)
  - [7.2 사용 설정](#72-사용-설정)
  - [7.3 useQuery](#73-usequery)
  - [7.4 useMutation](#74-usemutation)
- [8. 데이터 패칭 패턴](#8-데이터-패칭-패턴)
  - [8.1 Fetch-on-render](#81-fetch-on-render)
  - [8.2 Fetch-then-render](#82-fetch-then-render)
  - [8.3 Render-as-you-fetch](#83-render-as-you-fetch)
  - [8.4 패턴 비교 및 선택 가이드](#84-패턴-비교-및-선택-가이드)

## 7. React Query(TanStack Query)
* 공식 문서: https://tanstack.com/query
* React에서 서버 상태 관리를 위한 데이터 페칭 라이브러리
* API 서버로부터 받아온 데이터를 자동으로 캐시하고, 서버 상태와 클라이언트 상태를 동기화
* Pagination, Infinite Scroll 등 대용량 데이터 처리에 필요한 성능 최적화 기능 제공

### 7.1 설치
* React Query
  ```sh
  npm i @tanstack/react-query
  ```

* 개발자 도구
  ```sh
  npm i @tanstack/react-query-devtools
  ```
  - 개발자 도구 사용 방법 참고: https://tanstack.com/query/latest/docs/framework/react/devtools

### 7.2 사용 설정
* main.tsx에 추가
  ```tsx
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.tsx'
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const queryClient = new QueryClient();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={ queryClient }>
        <App />
        <ReactQueryDevtools initialIsOpen={ false } />
      </QueryClientProvider>
    </StrictMode>,
  )
  ```

### 7.3 useQuery
* 서버의 데이터를 조회할 때 사용하는 Hook (GET 요청)
* 응답받은 데이터는 자동으로 캐시되며, 동일한 쿼리 요청 시 서버에 재요청하지 않고 캐시된 데이터를 반환
* 캐시 상태
  - fresh: 쿼리 실행 후 캐시된 데이터가 최신 상태로 유지되는 기간
    + 이 상태에서는 동일한 쿼리 요청 시 서버에 요청하지 않고 캐시된 데이터를 즉시 반환
    + `staleTime` 속성으로 fresh 상태 유지 시간을 설정 가능 (기본값: 0)
  - stale: fresh 상태가 지난 후의 캐시 상태
    + 동일한 쿼리 요청 시 먼저 캐시된 데이터를 반환하고, 백그라운드에서 서버에 새로운 데이터를 요청
    + 서버에서 데이터가 도착하면 캐시를 업데이트하고 컴포넌트를 리렌더링

#### API
```tsx
useQuery(options)
```

##### options
* queryKey (필수)
  - 쿼리를 식별하는 고유한 키 값 (배열 형태)
  - 동일한 `queryKey`를 사용하는 쿼리는 같은 요청으로 인식되어 캐시된 결과를 공유
  - 계층적 구조로 작성하여 관련된 쿼리를 그룹화 가능
    
* queryFn (필수)
  - 쿼리 실행 시 호출되는 함수로, Promise를 반환해야 함
  - 일반적으로 axios나 fetch를 사용한 API 호출 함수를 반환

  ```tsx
  // 게시물 목록 조회
  useQuery({
    queryKey: ['posts'],
    queryFn: () => axiosInstance.get('/posts'),
  });
  
  // 3번 게시물 상세 조회
  useQuery({
    queryKey: ['posts', '3'],
    queryFn: () => axiosInstance.get('/posts/3'),
  });
  
  // 3번 게시물 댓글 목록 조회
  useQuery({
    queryKey: ['posts', '3', 'replies'],
    queryFn: () => axiosInstance.get('/posts/3/replies'),
  });
  ```

* select: queryFn이 반환한 데이터를 변환하거나 특정 부분만 추출하는 함수 (선택사항)
  - 원본 데이터를 변환하거나 필요한 필드만 추출할 때 사용
  - select 함수가 반환한 값이 쿼리의 `data`로 설정됨
  - 사용 예시
    ```tsx
    // axios 응답에서 실제 데이터만 추출
    useQuery({
      queryKey: ['posts', '1'],
      queryFn: () => axiosInstance.get('/posts/1'),
      select: (response) => response.data.item, // response.data.item만 반환
    });
    
    // 배열에서 특정 필드만 추출
    useQuery({
      queryKey: ['posts'],
      queryFn: () => axiosInstance.get('/posts'),
      select: (response) => response.data.items.map(post => ({
        id: post._id,
        title: post.title
      })),
    });
    ```
* staleTime: 데이터가 fresh 상태에서 stale 상태로 변경되는 시간 (밀리초, 기본값: 0)
* gcTime: 사용되지 않는 캐시 데이터가 메모리에서 제거되기까지의 시간 (기본값: 5분)
* refetchOnMount: 컴포넌트 마운트 시 stale 데이터를 자동으로 재요청할지 여부 (기본값: true)
  - `false`: stale 데이터를 재요청 안함
  - `"always"`: fresh 상태에서도 재요청
* refetchOnWindowFocus: 브라우저 창이 포커스를 받을 때 stale 데이터를 자동으로 재요청할지 여부 (기본값: true)
  - `false`: stale 데이터를 재요청 안함
  - `"always"`: fresh 상태에서도 재요청
* enabled: 쿼리 실행 여부를 제어 (기본값: true)
  - `false`로 설정하면 쿼리가 실행되지 않음
* retry: 실패한 쿼리의 재시도 설정 (기본값: 3)
  - `true`: 무한 재시도
  - `false`: 재시도하지 않음
  - 정수: 재시도 횟수
* suspense: React Suspense와 함께 사용할지 여부 (기본값: false)
  - `true`로 설정하면 `useSuspenseQuery`와 동일하게 동작
* 기타 옵션: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

##### 반환값
* 다음 속성을 가진 객체를 반환
  - isLoading: 쿼리가 처음 실행 중이거나 데이터가 없을 때 `true` (캐시된 데이터가 있으면 `false`)
  - isFetching: 쿼리가 현재 실행 중일 때 `true` (백그라운드 재요청 포함)
  - error: 쿼리 실행 중 발생한 에러 객체
  - data: 쿼리 성공 시 받은 데이터 (초기에는 `undefined`)
  - status: 쿼리 상태 (`'pending'`, `'error'`, `'success'`)
  - 기타 속성: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

### 7.4 useMutation
* 서버의 데이터를 변경할 때 사용하는 Hook (POST, PUT, PATCH, DELETE)
* `useMutation`은 Hook이므로 컴포넌트의 최상위 레벨에서 호출해야 함
* 데이터 변경 작업(등록, 수정, 삭제)은 대부분 사용자 액션에 의해 실행되므로, `useMutation`은 쿼리를 즉시 실행하지 않고 실행 함수(`mutate`)를 반환
* 이벤트 핸들러 내에서 반환된 `mutate` 함수를 호출하여 실제 데이터 변경 요청 실행

#### API
* useMutation(options)

##### options
* mutationFn (필수)
  - `mutate` 함수 호출 시 실행되는 함수로, Promise를 반환해야 함
  - 일반적으로 axios의 POST, PUT, PATCH, DELETE 메서드를 사용한 API 호출 함수를 반환
* gcTime, retry: `useQuery` 옵션과 동일 (참조: useQuery 설명)
* onSuccess: mutation 성공 시 실행되는 콜백 함수 (매개변수: 서버 응답 데이터)
* onError: mutation 실패 시 실행되는 콜백 함수 (매개변수: 에러 객체)
* onSettled: mutation 성공/실패와 관계없이 실행되는 콜백 함수 (매개변수: data, error)
  - `onSuccess`, `onError`, `onSettled`는 `useMutation` 옵션뿐만 아니라 `mutate` 함수 호출 시 옵션으로도 전달 가능(useMutation의 콜백 함수가 먼저 실행된 후 mutate의 콜백 함수도 실행)
* 기타 옵션: https://tanstack.com/query/latest/docs/react/reference/useMutation

##### 반환값
* 다음 속성을 가진 객체를 반환
  - mutate: mutation을 실행하는 함수 (이벤트 핸들러에서 호출)
  - mutateAsync: Promise를 반환하는 mutation 실행 함수
  - isLoading: mutation이 실행 중일 때 `true`
  - error: mutation 실행 중 발생한 에러 객체
  - data: mutation 성공 시 받은 서버 응답 데이터
  - status: mutation 상태 (`'idle'`, `'pending'`, `'error'`, `'success'`)
  - 기타 속성: https://tanstack.com/query/latest/docs/react/reference/useMutation

### 7.5 invalidateQueries
* 특정 쿼리를 무효화(stale)하여 자동으로 재요청하도록 하는 메서드
* 데이터 변경 후 관련된 쿼리 데이터를 최신 상태로 갱신할 때 사용
* `useQueryClient` Hook을 통해 `queryClient` 객체를 가져온 후 사용

#### API
```tsx
queryClient.invalidateQueries(options)
```

##### options
* queryKey (선택사항)
  - 무효화할 쿼리를 식별하는 키 값 (배열 형태)
  - `queryKey`를 지정하지 않으면 모든 쿼리가 무효화됨
  - 부분 일치: `queryKey`의 일부만 지정하면 해당 키로 시작하는 모든 쿼리가 무효화됨
    ```tsx
    // 정확히 일치하는 쿼리만 무효화
    queryClient.invalidateQueries({ queryKey: ['posts', '3', 'replies'] });
    
    // 'posts'로 시작하는 모든 쿼리 무효화 (['posts'], ['posts', '3'], ['posts', '3', 'replies'] 등)
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    
    // 모든 쿼리 무효화
    queryClient.invalidateQueries();
    ```
* exact: `queryKey`가 정확히 일치하는 쿼리만 무효화할지 여부 (기본값: false)
  - `true`: `queryKey`와 정확히 일치하는 쿼리만 무효화
  - `false`: `queryKey`로 시작하는 모든 쿼리 무효화
* refetchType: 무효화된 쿼리의 재요청 방식 (기본값: 'active')
  - `'active'`: 현재 활성화된 쿼리만 재요청
  - `'all'`: 무효화된 모든 쿼리 재요청
  - `'none'`: 재요청하지 않고 stale 상태로만 변경
* predicate: 쿼리를 필터링하는 함수 (선택사항)
  - 함수가 `true`를 반환하는 쿼리만 무효화
  ```tsx
  queryClient.invalidateQueries({
    predicate: (query) => query.queryKey[0] === 'posts' && query.state.data !== undefined
  });
  ```
* 기타 옵션: https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientinvalidatequeries

##### 반환값
* Promise를 반환하며, 무효화 작업이 완료되면 resolve됨

##### 사용 예시
```tsx
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// 새로운 댓글 작성 후 3번 게시물의 댓글 목록을 무효화하여 재요청
queryClient.invalidateQueries({ queryKey: ['posts', '3', 'replies'] });

// mutation 성공 후 관련 쿼리 무효화
const mutation = useMutation({
  mutationFn: (newReply) => axiosInstance.post('/posts/3/replies', newReply),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts', '3', 'replies'] });
  }
});
```

* 참고: https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientinvalidatequeries

### 7.6 prefetchQuery
* 데이터를 미리 가져와서 캐시에 저장하는 메서드
* 사용자가 실제로 해당 데이터를 요청하기 전에 미리 로드하여 성능을 향상시킬 수 있음
* 링크에 마우스를 올렸을 때, 다음 페이지로 이동하기 전에, 또는 특정 조건에서 데이터를 미리 로드할 때 사용
* `prefetchQuery`로 미리 가져온 데이터는 캐시에 저장되므로, 이후 `useQuery`나 `useSuspenseQuery`에서 동일한 `queryKey`로 요청하면 서버에 재요청하지 않고 캐시된 데이터를 즉시 반환
* `useQueryClient` Hook을 통해 `queryClient` 객체를 가져온 후 사용

#### API
```tsx
queryClient.prefetchQuery(options)
```

##### options
* queryKey (필수)
  - 쿼리를 식별하는 고유한 키 값 (배열 형태)
  - `useQuery`의 `queryKey`와 동일한 형식
* queryFn (필수)
  - 쿼리 실행 시 호출되는 함수로, Promise를 반환해야 함
  - 일반적으로 axios나 fetch를 사용한 API 호출 함수를 반환
* 기타 옵션: `useQuery`와 동일한 옵션 사용 가능

##### 반환값
* Promise를 반환하며, 데이터 패칭이 완료되면 resolve됨
* 이미 캐시에 fresh한 데이터가 있으면 서버에 요청하지 않고 즉시 resolve

##### 사용 예시
```tsx
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// 1번 게시물 데이터를 미리 가져와서 캐시에 저장
queryClient.prefetchQuery({
  queryKey: ['posts', 1],
  queryFn: () => axiosInstance.get('/posts/1'),
});

// 링크에 마우스를 올렸을 때 미리 데이터 로드
function PostLink({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', postId],
      queryFn: () => axiosInstance.get(`/posts/${postId}`),
    });
  };
  
  return (
    <Link to={`/posts/${postId}`} onMouseEnter={handleMouseEnter}>
      게시물 {postId}
    </Link>
  );
}

// 렌더링 중에 여러 데이터를 동시에 미리 가져오기
function PostList() {
  const queryClient = useQueryClient();
  
  // 게시물 목록 조회와 동시에 첫 번째 게시물 상세 정보도 미리 가져오기
  queryClient.prefetchQuery({
    queryKey: ['posts', 1],
    queryFn: () => axiosInstance.get('/posts/1'),
  });
  
  queryClient.prefetchQuery({
    queryKey: ['posts', 1, 'replies'],
    queryFn: () => axiosInstance.get('/posts/1/replies'),
  });
  
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axiosInstance.get('/posts'),
  });
  
  return <div>게시물 목록...</div>;
}
```

* 참고: https://tanstack.com/query/latest/docs/reference/QueryClient/#queryclientprefetchquery

# 8. 데이터 패칭 패턴
* 컴포넌트 렌더링과 비동기 데이터 로드 간의 관계를 정의하는 패턴으로, 각 패턴은 데이터 요청과 UI 렌더링의 타이밍을 다르게 처리함

## 8.1 Fetch-on-render
* 컴포넌트가 렌더링된 후 데이터 패칭

### 8.1.1 흐름
1. 컴포넌트가 처음 렌더링될 때 데이터가 보여질 영역을 비운 채로 렌더링
2. useEffect 훅에서 데이터 패칭 요청
3. 데이터가 도착하면 상태를 업데이트해서 응답 받은 데이터를 가지고 리렌더링
4. 자식 컴포넌트가 있다면 자식 컴포넌트도 1 ~ 3 순서로 작업

### 8.1.2 장점
* 코드가 간결하고 직관적
* 컴포넌트에서 필요한 데이터는 직접 패칭해서 사용하므로 각 컴포넌트가 독립적으로 동작해서 재사용성이 높음

### 8.1.3 단점
* 페이지 렌더링과 데이터 요청이 순차적으로 발생하여 폭포수 현상 발생
* 부모와 자식이 동일한 데이터를 요청할 경우 네트워크 요청이 중복될 수 있음

### 8.1.4 샘플 코드
```tsx
import axios from "axios";
import { useEffect, useState } from "react";

interface PostRes {
  ok: boolean;
  item: {
    _id: string;
    title: string;
  }
}

interface CommentsRes {
  ok: boolean;
  item: {
    _id: string;
    content: string;
  }[];
}

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://fesp-api.koyeb.app/market/posts/1?delay=3000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState<PostRes>();

  useEffect(() => {
    fetchPost().then(res => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>1번 게시물 로딩 중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  return axios.get<CommentsRes>('https://fesp-api.koyeb.app/market/posts/1/replies?delay=2000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 댓글 목록 조회 화면
export function Comments() {
  const [data, setData] = useState<CommentsRes>();

  useEffect(() => {
    fetchComments().then((res) => {
      setData(res.data);
    });
  }, []);

  if(!data){
    return <div>댓글 로딩 중...</div>;
  }

  const list = data?.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchOnRender;
```

## 8.2 Fetch-then-render
* 필요한 데이터를 모두 패칭한 후 컴포넌트 렌더링

### 8.2.1 흐름
1. 컴포넌트가 처음 렌더링될 때 데이터가 보여질 영역을 비운 채로 렌더링
2. 모듈 탑 레벨에서 데이터 패칭 요청(자식 컴포넌트에서 필요한 데이터도 동시에 패칭)
3. 데이터가 도착하면 상태를 업데이트해서 응답 받은 데이터를 가지고 리렌더링
4. 자식 컴포넌트가 있다면 Props로 데이터 전달. 자식 컴포넌트는 데이터 패칭 없이 바로 렌더링

### 8.2.2 장점
* 데이터를 미리 패칭하여 컴포넌트가 렌더링되는 시점에 로딩 상태가 없거나 짧음
* 부모가 데이터를 미리 가져와서 자식에게 전달하므로 네트워크 중복 요청 방지

### 8.2.3 단점
* 렌더링 전에 데이터를 요청하기 때문에 초기 로딩이 길어질 수 있음
* 부모 컴포넌트가 자식 컴포넌트의 의존성을 모두 관리해야 하므로 복잡성이 증가

### 8.2.4 샘플 코드
```tsx
import axios from "axios";
import { useEffect, useState } from "react";

interface PostRes {
  ok: boolean;
  item: {
    _id: string;
    title: string;
  }
}

interface CommentsRes {
  ok: boolean;
  item: {
    _id: string;
    content: string;
  }[];
}

// 게시글과 댓글 목록 조회를 동시에
function fetchData(){
  return Promise.all([
    fetchPost(),
    fetchComments(),
  ]).then(([ post, comments ]) => {
    return { post: post.data, comments: comments.data };
  });
}

// 데이터 패칭 시작(렌더링 전에 부모 컴포넌트에서 import하는 순간에 실행)
const promise = fetchData();

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get<PostRes>('https://fesp-api.koyeb.app/market/posts/1?delay=3000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  const [post, setPost] = useState<PostRes>();
  const [comments, setComments] = useState<CommentsRes>();

  useEffect(() => {
    promise.then(res => {
      setPost(res.post);
      setComments(res.comments);
    });
  }, []);

  if(!post){
    return <div>1번 게시물 로딩 중...</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      {comments && <Comments comments={comments}/>}
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchComments() {
  return axios.get<CommentsRes>('https://fesp-api.koyeb.app/market/posts/1/replies?delay=2000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// props로 전달받은 댓글 목록 출력
export function Comments({ comments }: { comments: CommentsRes }) {
  if(!comments){
    return <div>댓글 로딩 중...</div>;
  }

  const list = comments.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchThenRender;
```

## 8.3 Render-as-you-fetch
* React의 Suspense 컴포넌트를 사용
* 데이터 패칭과 동시에 컴포넌트 렌더링

### 8.3.1 Suspense
* React에서 비동기 작업이 완료될 때까지 기다렸다가 컴포넌트를 화면에 보여주는 기능
* 기다리는 동안에는 "로딩 중..." 같은 대체 화면(fallback)을 대신 보여줌

### 8.3.2 동작 원리(사용 방법)
1. 비동기 통신을 사용하는 컴포넌트를 Suspense 컴포넌트로 감싼다.
2. Suspense 컴포넌트의 fallback 속성으로 대체 UI를 지정한다.
    ```ts
    <Suspense fallback={<div>로딩 중...</div>}>
      <AsyncComponent />
    </Suspense>
    ```
3. 자식 컴포넌트(AsyncComponent)는 데이터를 로드하거나 비동기 작업을 수행하는 동안 Promise를 throw한다.
  - React Query, SWR 등의 라이브러리에는 이미 이 동작이 구현되어 있음
4. Suspense는 이 Promise를 감지하고, 자식 컴포넌트의 렌더링을 중지한 후 Suspense의 fallback UI를 렌더링한다.
5. Suspense는 자식 컴포넌트에서 반환받은 Promise가 Fulfilled 상태로 전환되면, 자식 컴포넌트를 리렌더링한다.

### 8.3.3 장점
* 데이터 요청과 컴포넌트 렌더링이 병렬로 진행되어 성능 최적화
* Suspense를 사용해 비동기 로직이 간결해짐

### 8.3.4 단점
* Suspense 컴포넌트를 추가적으로 감싸는 부분이 복잡해질 수 있음
* Suspense와 함께 동작하는 비동기 로직을 직접 작성하기가 복잡해서 외부 라이브러리(React Query, SWR 등)를 사용해야 할 수 있음
  - React 19 버전에 추가된 use() 훅으로 사용 가능

### 8.3.5 코드 샘플
```tsx
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostRes {
  ok: boolean;
  item: {
    _id: string;
    title: string;
  }
}

interface CommentsRes {
  ok: boolean;
  item: {
    _id: string;
    content: string;
  }[];
}

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get<PostRes>('https://fesp-api.koyeb.app/market/posts/1?delay=3000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // React Query 사용
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1],
    queryFn: () => fetchPost(),
    select: res => res.data,
    staleTime: 1000*10,
  });

  return (
    <>
      <h4>{data.item.title}</h4>
      <Comments />
    </>
  );
}

// 댓글 조회 API 호출
function fetchComments() {
  return axios.get<CommentsRes>('https://fesp-api.koyeb.app/market/posts/1/replies?delay=2000', {
    headers: {
      'client-id': 'openmarket'
    }
  });
}

// 댓글 목록 조회 화면
export function Comments() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1, 'replies'],
    queryFn: () => fetchComments(),
    select: res => res.data,
    staleTime: 1000*10,
  });
  console.log(data);
  
  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{ list }</ul>
    </>
  );
}

export default FetchAsYouRender;
```

```tsx
import { Suspense } from "react";
import FetchAsYouRender from "./FetchAsYouRender";

function App() {
  return (
    <Suspense fallback={<div>전체 페이지 로딩 중...</div>}>
      <FetchAsYouRender />
    </Suspense>
  );
}
```

## 8.4 패턴 비교 및 선택 가이드

### 8.4.1 각 패턴의 특징 비교

| 패턴 | 설명 | 초기 로딩 시간 | 네트워크 요청 | 코드 복잡도 | 사용 시기 |
|------|------|--------------|-------------|------------|----------|
| Fetch-on-render | 렌더링 후 가져오기 | 짧음 | 중복 가능 | 낮음 | 간단한 프로젝트, 독립적인 컴포넌트 |
| Fetch-then-render | 가져온 후 렌더링 | 길 수 있음 | 중복 없음 | 중간 | 데이터 의존성이 명확한 경우 |
| Render-as-you-fetch | 가져오는 동시에 렌더링 | 최적화됨 | 중복 없음 | 높음 | 성능이 중요한 대규모 프로젝트 |

### 8.4.2 선택 가이드
* Fetch-on-render: 프로토타입이나 작은 프로젝트에서 빠르게 개발할 때 적합
* Fetch-then-render: 부모-자식 컴포넌트 간 데이터 공유가 필요한 경우 적합
* Render-as-you-fetch: 사용자 경험과 성능이 중요한 프로덕션 환경에서 적합
