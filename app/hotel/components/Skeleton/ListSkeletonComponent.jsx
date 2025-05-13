import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ListSkeletonComponent = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item marginTop={10}>
          {/* List of Cards */}
          {[...Array(2)].map((_, index) => (
            <SkeletonPlaceholder.Item key={index} flexDirection="row" alignItems="center" marginTop={20}>
              <SkeletonPlaceholder.Item width={60} height={60} borderRadius={10} />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
                <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };
export default ListSkeletonComponent;